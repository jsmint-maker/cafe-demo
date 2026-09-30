'use client'

import { useCartStore } from '@/store/useCartStore'

export function FloatingCartBar() {
    const itemCount = useCartStore((state) =>
        state.items.reduce((sum, item) => sum + item.quantity, 0)
    )
    const setIsOpen = useCartStore((state) => state.setIsOpen)
    const total = useCartStore((state) => state.getTotal())

    if (itemCount === 0) return null

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
                onClick={() => setIsOpen(true)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-[#5D3A1A] text-white rounded-full shadow-2xl hover:bg-[#4a2e15] transition border border-amber-900/20"
            >
                <div className="flex items-center space-x-3">
                    <span className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {itemCount}
                    </span>
                    <span className="text-sm font-medium">View your order</span>
                </div>
                <span className="text-sm font-semibold tracking-wide">
                    ETB {total.toFixed(2)} →
                </span>
            </button>
        </div>
    )
}