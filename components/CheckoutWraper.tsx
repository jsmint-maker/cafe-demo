'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/useCartStore'
import CartDrawer from '@/components/CartDrawer'

export default function CheckoutWrapper() {
    useEffect(() => {
        void useCartStore.persist.rehydrate()
    }, [])

    const {
        isOpen,
        setIsOpen,
        items,
        updateQuantity,
        removeItem,
    } = useCartStore()

    return (
        <CartDrawer
            open={isOpen}
            items={items}
            onClose={() => setIsOpen(false)}
            onIncrease={(id) => updateQuantity(id, 1)}
            onDecrease={(id) => updateQuantity(id, -1)}
            onRemove={(id) => removeItem(id)}
            onCheckout={(details) => {
                // This triggers when the user clicks "Send Order via WhatsApp"
                const url = `https://wa.me/251900000000?text=${encodeURIComponent(details.whatsappMessage)}`
                window.open(url, '_blank')
            }}
        />
    )
}