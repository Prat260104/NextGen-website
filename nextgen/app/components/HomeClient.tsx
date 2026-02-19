"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function HomeClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
            {!loading && (
                <main className="flex min-h-screen flex-col">
                    <Navbar ready={true} />
                    <Hero ready={true} />
                    {children}
                </main>
            )}
        </>
    );
}
