'use client'

import { ShoppingBag } from "lucide-react";
import { MobileNavigation } from "./MobileNavigation";
import { useCartStore } from '@/store/useCartStore'
import Image from "next/image";

export function Header() {
    const setIsOpen = useCartStore((state) => state.setIsOpen)
    const items = useCartStore((state) => state.items)

    // Calculate total quantity of all items in cart
    const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <a href="#top" className="flex items-center gap-3" aria-label="Juniper & Stone home">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/logo.svg"
                            alt="Kalea Coffee Logo"
                            width={120}
                            height={50}
                            className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                        />
                    </div>
                    <span className="leading-none">
                        <span className="block font-serif text-md font-extrabold tracking-tight sm:text-lg">
                            Kalea Coffee
                        </span>
                        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                            COFFEE · BAKERY
                        </span>
                    </span>
                </a>

                <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Main navigation">
                    <a className="transition-colors hover:text-primary" href="#menu">Menu</a>
                    <a className="transition-colors hover:text-primary" href="#story">Our story</a>
                    <a className="transition-colors hover:text-primary" href="#visit">Visit us</a>
                </nav>

                <div className="flex items-center gap-3">
                    <a
                        href="#menu"
                        className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 sm:inline-flex"
                    >
                        Order now
                    </a>

                    <MobileNavigation />

                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative p-2 rounded-full border border-stone-300 hover:bg-stone-100 transition"
                        aria-label="Open cart drawer"
                    >
                        <ShoppingBag className="w-5 h-5 text-stone-900" />
                        {totalItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {totalItemsCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

        </header>
    )
}