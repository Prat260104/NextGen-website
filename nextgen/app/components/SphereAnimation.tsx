'use client';

import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, FXAAShader } from 'three-stdlib';

// -----------------------------------------------------------------------------
// 1. SETUP & EXTENSIONS
// -----------------------------------------------------------------------------
extend({ EffectComposer, RenderPass, ShaderPass, UnrealBloomPass });

// Types for TypeScript (prevents red lines)
// Types for TypeScript (prevents red lines)
declare module '@react-three/fiber' {
  // unrealBloomPass is not in the default types
  interface ThreeElements {
    unrealBloomPass: any;
  }
}

// -----------------------------------------------------------------------------
// 2. SHADER CODE (Exact Copy)
// -----------------------------------------------------------------------------

const rotateGLSL = `
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
`;

const fresnelGLSL = `
float fresnel(vec3 eye, vec3 normal) {
  return pow(1.0 + dot(eye, normal), 3.0);
}
`;

const vertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

const fragmentShader = `
uniform float u_time;
uniform float u_aspect;
uniform vec2 u_mouse;
uniform vec3 u_scale;
uniform float u_distortion;
uniform bool u_creepiness;
varying vec2 v_uv;

const float PI = 3.14159265358979;

${rotateGLSL}
${fresnelGLSL}

float smin( float a, float b, float k ) {
  float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
  return mix( b, a, h ) - k*h*(1.0-h);
}

float opUnion( float d1, float d2 ) { return min(d1,d2); }

float sdSphere(vec3 p, float r) {
  return length(p) - r;
}

float gyroid(in vec3 p, float t) {
  vec3 scale = u_scale + 1.0;
  p *= scale;
  vec3 p2 = mix(p, p.yzx, u_distortion);
  
  float g;
  if (u_creepiness) g = abs(dot(sin(p), cos(p2)) / length(scale)) - 0.04;
  else              g = dot(sin(p), cos(p2)) / length(scale);

  return g;
}

float sdf(vec3 p) {
  vec3 rp = rotate(p, vec3(0.3, 1.0, 0.2), u_time * 0.3);
  float t = (sin(u_time * 0.5 + PI / 2.0) + 1.0) * 0.5; // 0 ~ 1
  
  float sphere = sdSphere(p, 1.0);
  float g = gyroid(rp, t);

  float dist = smin(sphere, g, -0.01) + 0.03;
  float dist2 = smin(sphere, -g, -0.01) + 0.03;

  return opUnion(dist, dist2);
}

vec3 calcNormal(in vec3 p) {
  const float h = 0.0001;
  const vec2 k = vec2(1, -1) * h;
  return normalize( k.xyy * sdf( p + k.xyy ) + 
                    k.yyx * sdf( p + k.yyx ) + 
                    k.yxy * sdf( p + k.yxy ) + 
                    k.xxx * sdf( p + k.xxx ) );
}

void main() {
  vec2 centeredUV = (v_uv - 0.5) * vec2(u_aspect, 1.0);
  vec3 ray = normalize(vec3(centeredUV, -1.0));

  vec2 m = u_mouse * vec2(u_aspect, 1.0) * 0.07;
  ray = rotate(ray, vec3(1.0, 0.0, 0.0), m.y);
  ray = rotate(ray, vec3(0.0, 1.0, 0.0), -m.x);

  vec3 camPos = vec3(0.0, 0.0, 3.5);
  
  vec3 rayPos = camPos;
  float totalDist = 0.0;
  float tMax = 5.0;

  for(int i = 0; i < 256; i++) {
    float dist = sdf(rayPos);

    if (dist < 0.0001 || tMax < totalDist) break;

    totalDist += dist;
    rayPos = camPos + totalDist * ray;
  }

  // Deep dark base
  vec3 color = vec3(0.01, 0.05, 0.01);

  float cLen = length(centeredUV);
  cLen = 1.0 - smoothstep(0.0, 0.7, cLen);
  color *= vec3(cLen);

  if(totalDist < tMax) {
    vec3 normal = calcNormal(rayPos);
    
    float d = length(rayPos);
    d = smoothstep(0.5, 1.0, d);
    
    // Theme Green: #4DBC1B -> (0.30, 0.74, 0.11)
    // Core: Bright Neon Green
    // Dark: Deep Forest Green
    color = mix(vec3(0.30, 0.74, 0.11), vec3(0.02, 0.20, 0.02), d);
    
    float _fresnel = fresnel(ray, normal);
    // Fresnel Glow: Bright Greenish White
    color += vec3(0.6, 1.0, 0.6) * _fresnel * 1.5;
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

const focusFragmentShader = `
uniform sampler2D tDiffuse;
uniform float u_focus;
uniform float u_blur;
uniform int u_samples;
varying vec2 v_uv;
const int MAX_SAMPLES = 100;
const float PI = 3.14159265358979;
vec2 getDirection(float angle) {
  return vec2(sin(2.0 * PI * angle), cos(2.0 * PI * angle));
}
void main() {
  vec4 tex = vec4(1.0);
  float len = distance(v_uv, vec2(0.5));
  float focus = smoothstep(u_focus, 1.0, len);
  vec2 dir1 = getDirection(0.0 / 8.0);
  vec2 dir2 = getDirection(1.0 / 8.0);
  vec2 dir3 = getDirection(2.0 / 8.0);
  vec2 dir4 = getDirection(3.0 / 8.0);
  vec2 dir5 = getDirection(4.0 / 8.0);
  vec2 dir6 = getDirection(5.0 / 8.0);
  vec2 dir7 = getDirection(6.0 / 8.0);
  vec2 dir8 = getDirection(7.0 / 8.0);
  for(int i = 0; i < MAX_SAMPLES; i++) {
    if(i == u_samples) break;
    float ratio = focus * float(i) * 0.001 * u_blur;
    tex += texture2D(tDiffuse, v_uv + dir1 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir2 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir3 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir4 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir5 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir6 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir7 * ratio);
    tex += texture2D(tDiffuse, v_uv + dir8 * ratio);
  }
  tex /= float(u_samples) * 9.0;
  gl_FragColor = tex;
}
`;

const focusVertexShader = `
varying vec2 v_uv;
void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

// -----------------------------------------------------------------------------
// 3. MAIN SCENE COMPONENT
// -----------------------------------------------------------------------------

const ScreenPlane = () => {
  const config = {
    scaleX: 5,
    scaleY: 5,
    scaleZ: 5,
    creepiness: false,
    rotation: true,
  };

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_aspect: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0, 0) },
        u_scale: { value: new THREE.Vector3(config.scaleX, config.scaleY, config.scaleZ) },
        u_distortion: { value: 0 },
        u_creepiness: { value: config.creepiness },
      },
      vertexShader,
      fragmentShader,
    });
  }, []);

  const vec = new THREE.Vector2();

  useFrame(({ size, mouse, clock }) => {
    const time = clock.getElapsedTime();
    const zoomFactor = 1 + 0.01 * Math.sin(time * 1.5);

    shaderMaterial.uniforms.u_scale.value.set(
      config.scaleX * zoomFactor,
      config.scaleY * zoomFactor,
      config.scaleZ * zoomFactor
    );

    if (config.rotation) {
      shaderMaterial.uniforms.u_time.value += 0.005;
    }

    shaderMaterial.uniforms.u_distortion.value = (Math.sin(time * 0.5) + 1) / 2;
    shaderMaterial.uniforms.u_aspect.value = size.width / size.height;

    // Safety check for mouse
    if (mouse) {
      shaderMaterial.uniforms.u_mouse.value.lerp(vec.set(mouse.x / 2, mouse.y / 2), 0.05);
    }
  });

  return (
    <Plane args={[2, 2]}>
      <primitive object={shaderMaterial} attach="material" />
    </Plane>
  );
};

// -----------------------------------------------------------------------------
// 4. EFFECTS COMPONENT (Post-Processing)
// -----------------------------------------------------------------------------

const Effects = () => {
  const composer = useRef<EffectComposer>(null);
  const { gl, scene, camera, size } = useThree();

  useEffect(() => {
    if (composer.current) {
      composer.current.setSize(size.width, size.height);
    }
  }, [size]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  const resolution = useMemo(() => new THREE.Vector2(size.width, size.height), [size]);

  const focusShader = useMemo(() => ({
    uniforms: {
      tDiffuse: { value: null },
      u_focus: { value: -0.05 },
      u_blur: { value: 1.0 },
      u_samples: { value: 20 },
    },
    vertexShader: focusVertexShader,
    fragmentShader: focusFragmentShader,
  }), []);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attach="passes" args={[scene, camera]} />
      <shaderPass attach="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} />
      <unrealBloomPass attach="passes" args={[resolution, 2.0, 0.5, 0.6]} />
      <shaderPass attach="passes" args={[focusShader]} />
    </effectComposer>
  );
};

// -----------------------------------------------------------------------------
// 5. CAMERA RIG (Keeps the scene aspect ratio correct)
// -----------------------------------------------------------------------------
const CameraRig = () => {
  const { camera } = useThree();
  useFrame(() => {
    // Force the camera to stay -1 to 1 to match the Plane geometry
    if (camera instanceof THREE.OrthographicCamera) {
      camera.left = -1;
      camera.right = 1;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();
    }
  });
  return null;
}

// -----------------------------------------------------------------------------
// 6. MAIN EXPORT
// -----------------------------------------------------------------------------
export default function SphereAnimation() {
  // TOGGLE THIS TO TRUE TO ENABLE BLUR/GLOW EFFECTS
  const ENABLE_EFFECTS = false;

  return (
    // IMPORTANT: style height must be set for Canvas to appear
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 10], near: -10, far: 10 }}
        dpr={[1, 2]}
        gl={{ alpha: true }}
      >
        {/* Transparent background to blend with section */}
        {/* <color attach="background" args={['#000000']} /> */}
        <CameraRig />
        <ScreenPlane />
        {ENABLE_EFFECTS && <Effects />}
      </Canvas>
    </div>
  );
}