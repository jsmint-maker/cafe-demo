'use client';

import { X } from 'lucide-react';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-[#FAF9F5] rounded-3xl shadow-2xl overflow-hidden border border-stone-200 p-6 md:p-8 max-h-[90vh] overflow-y-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-200/60 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition"
                    aria-label="Close modal"
                >
                    <X className="size-4" />
                </button>

                {/* Modal Content */}
                <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-800 mb-2 block">
                    Our Philosophy
                </span>
                <h2 className="font-serif text-3xl font-normal text-stone-900 mb-4 leading-tight">
                    Crafted with patience in Bole.
                </h2>

                <div className="space-y-4 text-stone-600 text-sm leading-relaxed mb-6">
                    <p>
                        Kalea Coffee was born out of a deep appreciation for Ethiopia&apos;s rich coffee heritage combined with modern artisanal baking. We believe that great coffee isn&apos;t just a morning routine—it&apos;s a ritual meant to be savored.
                    </p>
                    <p>
                        Every single-origin bean we roast is sourced directly from local growers who prioritize sustainable cultivation. Our pastries and bites are prepared in small batches daily, ensuring fresh, authentic flavors in every single bite.
                    </p>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-200">
                    <div className="bg-stone-100/80 p-3 rounded-2xl">
                        <h4 className="font-serif font-medium text-stone-900 text-xs mb-1">100% Sourced Locally</h4>
                        <p className="text-[11px] text-stone-500">Partnering directly with Ethiopian farmers.</p>
                    </div>
                    <div className="bg-stone-100/80 p-3 rounded-2xl">
                        <h4 className="font-serif font-medium text-stone-900 text-xs mb-1">Small Batch Roasting</h4>
                        <p className="text-[11px] text-stone-500">Roasted weekly for absolute peak flavor.</p>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-[#5D3A1A] text-white rounded-full font-medium text-xs hover:bg-[#482c13] transition shadow-sm"
                    >
                        Back to Page
                    </button>
                </div>

            </div>
        </div>
    );
}