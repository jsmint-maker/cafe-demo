'use client'

import { Clock3, MapPin, Phone } from "lucide-react";

export function VisitSection() {
    return (
        <section id="visit" className="bg-[#FAF9F5] text-stone-900 py-16 px-6 md:px-12 border-t border-stone-200">
            <div className="max-w-xl mx-auto">

                {/* Section Header */}
                <span className="text-[11px] font-semibold tracking-widest uppercase text-amber-800 mb-3 block">
                    Come Say Hello
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-normal leading-tight mb-8">
                    Your corner of <span className="italic text-[#5D3A1A]">the neighborhood.</span>
                </h2>

                {/* Details Grid: Find Us & Opening Hours */}
                <div className="space-y-6 mb-10 text-stone-700">

                    {/* Address */}
                    <div className="flex items-start space-x-4">
                        <div className="p-2.5 rounded-full bg-stone-100 text-[#5D3A1A] mt-0.5">
                            📍
                        </div>
                        <div>
                            <h3 className="font-serif font-medium text-stone-900 text-base mb-0.5">Find us</h3>
                            <p className="text-sm text-stone-600">Bole Road, near Friendship City Center</p>
                            <p className="text-sm text-stone-600">Addis Ababa, Ethiopia</p>
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="flex items-start space-x-4">
                        <div className="p-2.5 rounded-full bg-stone-100 text-[#5D3A1A] mt-0.5">
                            🕒
                        </div>
                        <div>
                            <h3 className="font-serif font-medium text-stone-900 text-base mb-0.5">Opening hours</h3>
                            <p className="text-sm text-stone-600">Mon — Fri: 7:00 AM — 4:00 PM</p>
                            <p className="text-sm text-stone-600">Sat — Sun: 8:00 AM — 4:00 PM</p>
                        </div>
                    </div>

                </div>

                {/* Stay in the Loop Newsletter Card */}
                <div className="bg-[#F4EFE6] rounded-3xl p-6 md:p-8 border border-stone-200/80 shadow-sm relative overflow-hidden">
                    <h3 className="font-serif text-2xl font-normal text-stone-900 mb-2">
                        Stay in the loop.
                    </h3>
                    <p className="text-stone-600 text-xs md:text-sm mb-6 leading-relaxed">
                        Seasonal specials, fresh bakes, and the occasional good idea.
                    </p>

                    {/* Newsletter Input Form */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-4 py-3 rounded-full bg-white border border-stone-300 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#5D3A1A] transition shadow-inner"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#5D3A1A] text-white rounded-full font-medium text-xs hover:bg-[#482c13] transition shadow-sm"
                        >
                            Join the Club
                        </button>
                    </form>

                    {/* Phone Contact */}
                    <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-stone-300/60 text-stone-700 text-xs font-medium">
                        <span>📞</span>
                        <span>+251 11 662 0000</span>
                    </div>
                </div>

            </div>
        </section>
    )
}