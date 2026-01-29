import React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
    children: React.ReactNode
    className?: string
    as?: React.ElementType
    href?: string
    interactive?: boolean
    target?: string
    rel?: string
}

export default function GlassCard({
    children,
    className,
    as: Component = "div",
    href,
    interactive = true,
    target,
    rel,
}: GlassCardProps) {
    const isLink = !!href
    const Tag = isLink ? "a" : Component

    return (
        <Tag
            href={href}
            target={target}
            rel={rel}
            className={cn(
                "block p-6 rounded-xl bg-white/5 border border-white/10 transition-all duration-300",
                interactive && "hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:brightness-110 hover:scale-[1.01] hover:shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)]",
                className
            )}
        >
            {children}
        </Tag>
    )
}
