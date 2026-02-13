"use client";

export default function GrainOverlay() {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9991]"
            style={{ mixBlendMode: "overlay" }}
        >
            <svg className="w-0 h-0 absolute">
                <filter id="grain-filter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
            </svg>
            <div
                className="absolute inset-0 grain-animation"
                style={{
                    filter: "url(#grain-filter)",
                    opacity: 0.04,
                }}
            />
        </div>
    );
}
