"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const onMouseMove = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        document.addEventListener("mousemove", onMouseMove);
        return () => document.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed z-[9999] pointer-events-none hidden md:block"
            style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                transform: "translate(-50%, -50%)",
                mixBlendMode: "difference",
            }}
        />
    );
}
