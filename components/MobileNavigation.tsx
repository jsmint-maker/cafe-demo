'use client'

import { Menu, X } from "lucide-react"
import { useState } from "react"

export function MobileNavigation() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen((open) => !open)}
                className="rounded-full border border-border p-2 md:hidden"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
            >
                {isOpen ? <X /> : <Menu />}
            </button>
            {isOpen && (
                <nav
                    id="mobile-navigation"
                    className="absolute left-0 right-0 top-full flex flex-col gap-4 border-t border-border bg-background px-4 py-5 text-sm font-medium shadow-md md:hidden"
                    aria-label="Mobile navigation"
                >
                    <a href="#menu" onClick={() => setIsOpen(false)}>Menu</a>
                    <a href="#story" onClick={() => setIsOpen(false)}>Our story</a>
                    <a href="#visit" onClick={() => setIsOpen(false)}>Visit us</a>
                </nav>
            )}
        </>
    )
}
