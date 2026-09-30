'use client'

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsVisible(window.scrollY > 320)

        onScroll()
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <a
            href="#top"
            className={`fixed z-50 bottom-22 right-3 rounded-full border border-border bg-background p-2 shadow-sm transition-all duration-200 md:hidden ${isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
            aria-label="Scroll to top"
        >
            <ArrowUp />
        </a>
    )
}
