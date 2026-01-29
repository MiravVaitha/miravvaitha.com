import React from "react"
import NeuralBackground from "@/components/ui/flow-field-background"
import Nav from "./Nav"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

interface LayoutProps {
    children: React.ReactNode
    variant?: "home" | "content"
}

export default function Layout({ children, variant = "content" }: LayoutProps) {
    const isHome = variant === "home"
    const shouldReduceMotion = useReducedMotion()

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
            {/* Background layer: Covers full viewport behind everything */}
            <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
                <NeuralBackground
                    color="#818cf8"
                    trailOpacity={0.1}
                    speed={0.8}
                    className="w-full h-full"
                />
            </div>

            {/* Content layer: Glass effect container with variant styling and transitons */}
            <motion.main
                layout
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "relative z-10 w-full transition-all duration-500 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden",
                    isHome
                        ? "max-w-6xl bg-black/20 p-12 md:p-20"
                        : "max-w-4xl bg-black/40 p-6 md:p-12"
                )}
            >
                <Nav />
                {children}
            </motion.main>
        </div>
    )
}
