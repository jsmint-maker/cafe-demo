'use client';

import { Minus, Plus, ShoppingBag, Trash, Trash2, TrashIcon, TrashOff, X } from 'lucide-react';
import { useCartStore, type CartItem, type OrderType } from '@/store/useCartStore';

const orderTypeOptions: { value: OrderType; label: string }[] = [
    { value: 'dine-in', label: 'Dine-In' },
    { value: 'pickup', label: 'Takeaway' },
    { value: 'delivery', label: 'Delivery' },
];

export interface OrderDetails {
    orderType: OrderType;
    tableNumber: string;
    instructions: string;
    tipPercent: number;
    subtotal: number;
    tipAmount: number;
    total: number;
    deliveryAddress: string;
    whatsappMessage: string;
}

interface CartDrawerProps {
    open: boolean;
    items: CartItem[];
    onClose: () => void;
    onIncrease: (itemId: string | number) => void;
    onDecrease: (itemId: string | number) => void;
    onRemove: (itemId: string | number) => void;
    onCheckout?: (details: OrderDetails) => void;
}

const formatEtb = (amount: number) =>
    `ETB ${amount.toLocaleString('en-ET', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CartDrawer({
    open,
    items,
    onClose,
    onIncrease,
    onDecrease,
    onRemove,
    onCheckout,
}: CartDrawerProps) {
    const {
        orderType,
        setOrderType,
        specialInstructions,
        setSpecialInstructions,
        tableNumber,
        setTableNumber,
        deliveryAddress,
        setDeliveryAddress,
        tipPercent,
        setTipPercent,
        tipMode,
        setTipMode,
        customTipAmount,
        setCustomTipAmount,
        customerPhone,
        setCustomerPhone,
        setIsOpen,
        getSubtotal,
        getTipAmount,
        getTotal,
    } = useCartStore();

    const subtotal = getSubtotal();
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const tipAmount = getTipAmount();
    const total = getTotal();

    const createOrderDetails = (): OrderDetails => {
        const locationDetails =
            orderType === 'dine-in'
                ? `Table: ${tableNumber.trim() || 'N/A'}`
                : orderType === 'delivery'
                    ? `Address: ${deliveryAddress.trim() || 'N/A'} | Phone: ${customerPhone.trim() || 'N/A'}`
                    : 'Takeaway (Counter Pickup in Bole)';

        const typeLabel = orderTypeOptions.find((option) => option.value === orderType)?.label;
        const tipLabel = tipMode === 'custom' ? 'Tip (custom)' : `Tip (${tipPercent}%)`;
        const whatsappMessage = [
            'Hello Kalea Coffee & Bekery, I would like to place an order:',
            '',
            `Order type: ${typeLabel}`,
            `Details: ${locationDetails}`,
            '',
            'Items:',
            ...items.map(
                (item) =>
                    `• ${item.quantity} × ${item.name} — ${formatEtb(item.price * item.quantity)}`,
            ),
            '',
            `Subtotal: ${formatEtb(subtotal)}`,
            `${tipLabel}: ${formatEtb(tipAmount)}`,
            `Total: ${formatEtb(total)}`,
            ...(specialInstructions.trim() ? ['', `Special instructions: ${specialInstructions.trim()}`] : []),
        ].join('\n');

        return {
            orderType,
            tableNumber,
            instructions: specialInstructions.trim(),
            tipPercent,
            subtotal,
            tipAmount,
            total,
            deliveryAddress,
            whatsappMessage,
        };
    };

    const handleCheckout = () => {
        const details = createOrderDetails();
        onCheckout?.(details);
        if (typeof window !== 'undefined' && !onCheckout) {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(details.whatsappMessage)}`,
                '_blank',
                'noopener,noreferrer',
            );
        }
    };

    return (
        <div
            className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
            aria-hidden={!open}
        >
            <button
                type="button"
                aria-label="Close cart"
                className={`absolute inset-0 h-full w-full bg-stone-950/35 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
            />
            <aside
                aria-label="Shopping cart"
                aria-modal="true"
                role="dialog"
                className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#FAF9F5] text-stone-900 shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <header className="flex items-center justify-between border-b border-stone-200 px-5 py-5 sm:px-7">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800">
                            Your order
                        </p>
                        <h2 className="mt-1 font-serif text-3xl tracking-tight">Shopping bag</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition hover:border-amber-800 hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
                        aria-label="Close shopping bag"
                    >
                        <X aria-hidden="true" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                    <fieldset className="mb-7">
                        <legend className="mb-3 text-sm font-semibold text-stone-900">
                            How will you enjoy it?
                        </legend>
                        <div className="grid grid-cols-3 gap-2">
                            {orderTypeOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    aria-pressed={orderType === option.value}
                                    onClick={() => setOrderType(option.value)}
                                    className={`rounded-lg border px-2 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 ${orderType === option.value ? 'border-amber-800 bg-amber-800 text-white' : 'border-stone-200 bg-white/60 text-stone-700 hover:border-amber-800 hover:text-amber-800'}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </fieldset>
                    {orderType === 'dine-in' && (
                        <div className="mb-6">
                            <label
                                htmlFor="table-number"
                                className="mb-2 block text-sm font-medium"
                            >
                                Table number{' '}
                                <span className="font-normal text-stone-500">(optional)</span>
                            </label>
                            <input
                                id="table-number"
                                value={tableNumber}
                                onChange={(event) => setTableNumber(event.target.value)}
                                placeholder="e.g. 7"
                                className="w-full rounded-lg border border-stone-200 bg-white/60 px-3 py-2.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20"
                            />
                        </div>
                    )}

                    {orderType === 'delivery' && (
                        <div className="mb-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-900 mb-2">Delivery Address / Landmark</label>
                                <input
                                    type="text"
                                    autoComplete='street-address'
                                    value={deliveryAddress}
                                    onChange={(e) => setDeliveryAddress(e.target.value)}
                                    placeholder="e.g. Bole Medhanialem, near Edna Mall"
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:border-amber-800 text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-900 mb-2">Phone number (for delivery updates)</label>
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="e.g. 0911234567"
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:border-amber-800 text-sm"
                                />
                            </div>
                        </div>
                    )}

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center my-auto">
                            {orderType === 'dine-in' ? (
                                /* Welcome Card for Table Reservation */
                                <div className="bg-amber-600/10 border border-amber-700/40 rounded-2xl p-6 mb-6 w-full text-amber-900">
                                    <div className="w-12 h-12 bg-white border border-amber-800 ring-2 ring-amber-700/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm overflow-hidden p-1.5">
                                        <img
                                            src="/logo.svg"
                                            alt="Kalea Logo"
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <h4 className="font-serif font-medium text-lg mb-1">Table Session Ready</h4>
                                    <p className="text-xs text-amber-800/80 leading-relaxed mb-4">
                                        You are ordering for <strong>Dine-In</strong>. Close this drawer, pick your favorite coffees or pastries from the menu, and they will appear right here!
                                    </p>
                                    <a
                                        href='#menu'
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-2 px-4 bg-amber-800 text-white text-xs font-medium rounded-xl hover:bg-amber-900 transition"
                                    >
                                        Explore Menu & Add Items
                                    </a>
                                </div>
                            ) : (
                                /* Standard Empty State */
                                <>
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-500">
                                        🛍️
                                    </div>
                                    <h4 className="font-serif text-stone-900 text-base mb-1">Your bag is empty</h4>
                                    <p className="text-xs text-stone-500 mb-6">Add something warm from the counter and it will appear here.</p>
                                </>
                            )}
                        </div>
                    ) : (<>
                        {items.length > 2 && (
                            <button
                                onClick={() => {
                                    if (window.confirm("Clear all items from your bag?")) {
                                        useCartStore.getState().clearCart()
                                    }
                                }}
                                className="flex items-center mb-3 space-x-1 py-1.5 text-xs font-medium text-red-400 transition"
                            >
                                <TrashIcon className='size-4' />
                                <span>Clear bag</span>
                            </button>
                        )}

                        <ul
                            className="flex flex-col gap-5"
                            aria-label={`${itemCount} cart ${itemCount === 1 ? 'item' : 'items'}`}
                        >
                            {items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex gap-4 border-b border-stone-200 pb-5 last:border-0"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.imageAlt ?? item.name}
                                        className="size-20 shrink-0 rounded-xl object-cover"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-serif text-lg leading-tight">
                                                {item.name}
                                            </h3>
                                            <button
                                                type="button"
                                                onClick={() => onRemove(item.id)}
                                                className="text-stone-500 transition hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
                                                aria-label={`Remove ${item.name}`}
                                            >
                                                <Trash2 aria-hidden="true" />
                                            </button>
                                        </div>
                                        <p className="mt-1 text-sm font-semibold text-amber-800">
                                            {formatEtb(item.price * item.quantity)}
                                        </p>
                                        <div className="mt-3 inline-flex items-center rounded-full border border-stone-200 bg-white/60">
                                            <button
                                                type="button"
                                                onClick={() => onDecrease(item.id)}
                                                className="flex size-8 items-center justify-center text-stone-700 transition hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
                                                aria-label={`Decrease ${item.name} quantity`}
                                            >
                                                <Minus aria-hidden="true" />
                                            </button>
                                            <span
                                                className="min-w-8 text-center text-sm font-semibold"
                                                aria-label={`${item.quantity} ordered`}
                                            >
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => onIncrease(item.id)}
                                                className="flex size-8 items-center justify-center text-stone-700 transition hover:text-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800"
                                                aria-label={`Increase ${item.name} quantity`}
                                            >
                                                <Plus aria-hidden="true" />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                    )}



                    <div className="mt-7">
                        <label
                            htmlFor="special-instructions"
                            className="mb-2 block text-sm font-medium"
                        >
                            Special instructions{' '}
                            <span className="font-normal text-stone-500">(optional)</span>
                        </label>
                        <textarea
                            id="special-instructions"
                            value={specialInstructions}
                            onChange={(event) => setSpecialInstructions(event.target.value)}
                            placeholder="Anything we should know about your order?"
                            rows={3}
                            className="w-full resize-none rounded-lg border border-stone-200 bg-white/60 px-3 py-2.5 text-sm outline-none transition placeholder:text-stone-400 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/20"
                        />
                    </div>

                </div>

                <footer className="border-t border-stone-200 bg-[#FAF9F5] px-5 py-5 sm:px-7">
                    <div className="mb-4">
                        <p className="mb-2 text-sm font-semibold">Add a tip</p>
                        <div className="flex flex-wrap gap-3">
                            {([10, 15, 0]).map((tip) => (
                                <button
                                    key={tip}
                                    type="button"
                                    aria-pressed={tipMode === 'percentage' && tipPercent === tip}
                                    onClick={() => {
                                        setTipMode('percentage');
                                        setTipPercent(tip);
                                    }}
                                    className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 ${tipMode === 'percentage' && tipPercent === tip
                                        ? 'border-amber-800 bg-amber-800 text-white'
                                        : 'border-stone-200 bg-white/60 text-stone-700 hover:border-amber-800'
                                        }`}
                                >
                                    {tip === 0 ? 'None' : `${tip}%`}
                                </button>
                            ))}
                            <button
                                type="button"
                                aria-pressed={tipMode === 'custom'}
                                onClick={() => setTipMode('custom')}
                                className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 ${tipMode === 'custom'
                                    ? 'border-amber-800 bg-amber-800 text-white'
                                    : 'border-stone-200 bg-white/60 text-stone-700 hover:border-amber-800'
                                    }`}
                            >
                                Custom
                            </button>
                        </div>
                        {tipMode === 'custom' && (
                            <div className="mt-3 mb-4 w-full">
                                <input
                                    type="number"
                                    value={customTipAmount || ''}
                                    onChange={(e) => setCustomTipAmount(Number(e.target.value))}
                                    placeholder="Enter tip amount in ETB"
                                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white text-stone-900 focus:outline-none focus:border-amber-800 text-sm"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-stone-600">
                        <span>Subtotal</span>
                        <span>{formatEtb(subtotal)}</span>
                    </div>
                    {(tipMode === 'custom' ? customTipAmount > 0 : tipPercent > 0) && (
                        <div className="mt-1 flex items-center justify-between text-sm text-stone-600">
                            <span>{tipMode === 'custom' ? 'Tip (custom)' : `Tip (${tipPercent}%)`}</span>
                            <span>{formatEtb(tipAmount)}</span>
                        </div>
                    )}
                    <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
                        <span className="font-semibold">Total</span>
                        <span className="text-lg font-semibold text-stone-900">
                            {formatEtb(total)}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={handleCheckout}
                        disabled={items.length === 0}
                        className="mt-5 flex w-full items-center justify-center rounded-xl bg-amber-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-800 focus-visible:ring-offset-2"
                    >
                        Send Order via WhatsApp
                    </button>
                </footer>
            </aside >
        </div >
    );
}

export { formatEtb };
export type { CartDrawerProps, CartItem };
