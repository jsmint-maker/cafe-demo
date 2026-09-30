import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type OrderType = 'pickup' | 'dine-in' | 'delivery'

export interface CartItem {
    id: string | number
    name: string
    price: number
    quantity: number
    image?: string
    imageAlt?: string
    notes?: string
}

interface CartState {
    isOpen: boolean
    items: CartItem[]
    orderType: OrderType
    specialInstructions: string
    tableNumber: string
    tipPercent: number
    deliveryAddress: string
    tipMode: 'percentage' | 'custom'
    customTipAmount: number
    customerPhone: string

    // Actions
    setCustomerPhone: (phone: string) => void
    setDeliveryAddress: (address: string) => void
    setSpecialInstructions: (instructions: string) => void
    setTipMode: (mode: 'percentage' | 'custom') => void
    setCustomTipAmount: (amount: number) => void
    setIsOpen: (open: boolean) => void
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: string | number) => void
    updateQuantity: (id: string | number, delta: number) => void
    updateNotes: (id: string | number, notes: string) => void
    setOrderType: (type: OrderType) => void
    setTableNumber: (num: string) => void
    setTipPercent: (tip: number) => void
    clearCart: () => void

    // Computed totals
    getSubtotal: () => number
    getTipAmount: () => number
    getTotal: () => number
}

type PersistedCartState = Pick<
    CartState,
    | 'items'
    | 'orderType'
    | 'specialInstructions'
    | 'tableNumber'
    | 'tipPercent'
    | 'deliveryAddress'
    | 'tipMode'
    | 'customTipAmount'
    | 'customerPhone'
>

export const useCartStore = create<CartState>()(persist((set, get) => ({
    isOpen: false,
    items: [],
    orderType: 'pickup',
    specialInstructions: '',
    tableNumber: '',
    tipPercent: 0,
    deliveryAddress: '',
    tipMode: 'percentage',
    customTipAmount: 0,
    customerPhone: '',

    setCustomerPhone: (customerPhone) => set({ customerPhone }),
    setDeliveryAddress: (deliveryAddress) => set({ deliveryAddress }),
    setSpecialInstructions: (specialInstructions) => set({ specialInstructions }),
    setTipMode: (tipMode) => set({ tipMode }),
    setCustomTipAmount: (customTipAmount) => set({ customTipAmount }),

    setIsOpen: (isOpen) => set({ isOpen }),

    addItem: (newItem) => set((state) => {
        const existingIndex = state.items.findIndex(item => item.id === newItem.id)
        if (existingIndex > -1) {
            const updated = state.items.map((item, index) =>
                index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
            )
            return { items: updated }
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] }
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),

    updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta
                return newQty > 0 ? { ...item, quantity: newQty } : null
            }
            return item
        }).filter(Boolean) as CartItem[]
    })),

    updateNotes: (id, notes) => set((state) => ({
        items: state.items.map(item => item.id === id ? { ...item, notes } : item)
    })),

    setOrderType: (orderType) => set({ orderType }),
    setTableNumber: (tableNumber) => set({ tableNumber }),
    setTipPercent: (tipPercent) => set({ tipPercent }),
    clearCart: () => set({ items: [] }),

    getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },

    getTipAmount: () => {
        const state = get()
        if (state.tipMode === 'custom') {
            return state.customTipAmount
        }
        const subtotal = get().getSubtotal()
        return (subtotal * state.tipPercent) / 100
    },

    getTotal: () => {
        return get().getSubtotal() + get().getTipAmount()
    }
}), {
    name: 'kalea-cart',
    storage: createJSONStorage(() => localStorage),
    skipHydration: true,
    partialize: (state): PersistedCartState => ({
        items: state.items,
        orderType: state.orderType,
        specialInstructions: state.specialInstructions,
        tableNumber: state.tableNumber,
        tipPercent: state.tipPercent,
        deliveryAddress: state.deliveryAddress,
        tipMode: state.tipMode,
        customTipAmount: state.customTipAmount,
        customerPhone: state.customerPhone,
    }),
}))