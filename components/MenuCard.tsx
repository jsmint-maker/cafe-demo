'use client'

import { Plus } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'

export function MenuCard({ item }: { item: any }) {
    const addItem = useCartStore((state) => state.addItem)
    const cartItems = useCartStore((state) => state.items)

    // Find if this specific item is already in the cart to show its count
    const cartItem = cartItems.find(ci => ci.id === item.id)
    const quantity = cartItem ? cartItem.quantity : 0

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="relative aspect-[1.35] overflow-hidden bg-muted">
                {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105" />
                )}
                {item.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {item.tag}
                    </span>
                )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="min-w-0 font-serif text-2xl">{item.title}</h3>
                        <span className="shrink-0 whitespace-nowrap font-semibold text-primary">ETB {item.price.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>

                <button
                    onClick={() => addItem({
                        id: item.id,
                        name: item.title,
                        price: item.price,
                        image: item.image_url
                    })}
                    className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-semibold transition hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                    <Plus className="size-4 shrink-0" />
                    <span>Add to order{quantity > 0 ? ` (${quantity})` : ''}</span>
                </button>
            </div>
        </article>
    )
}
