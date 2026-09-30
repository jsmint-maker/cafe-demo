'use client'

import { useCartStore } from "@/store/useCartStore";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function HeroSection() {
    return (
        <section id="top" className="relative scroll-mt-18 overflow-hidden border-b border-border bg-secondary/35">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.03fr_.97fr] lg:px-8 lg:py-28">
                <div className="relative z-10">
                    <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-primary">
                        <span className="h-px w-7 bg-accent" />
                        A NEIGHBORHOOD TABLE IN BOLE
                    </p>

                    <h1 className="max-w-3xl font-serif text-5xl leading-[.98] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
                        From Ethiopian soil.
                        <br />
                        <em className="font-normal text-primary">To your morning cup.</em>
                    </h1>

                    <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                        An artisan roastery and cafe for thoughtful single-origins, warm pastries, and the pleasure of taking your time.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">
                        <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                            Explore the menu
                            <ArrowRight />
                        </a>
                        <button
                            onClick={() => {
                                useCartStore.getState().setOrderType('dine-in');
                                useCartStore.getState().setIsOpen(true);
                            }}
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm tracking-wide font-bold transition hover:border-primary hover:text-primary"
                        >
                            Reserve a table
                            <ArrowUpRight />
                        </button>
                    </div>

                    <div className="flex items-center max-w-sm justify-between bg-white/60 backdrop-blur-sm border border-stone-200/80 rounded-2xl p-3 mt-7 shadow-sm">
                        {/* Overlapping Avatar Circles */}
                        <div className="flex items-center -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-[#5D3A1A] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">M</div>
                            <div className="w-8 h-8 rounded-full bg-amber-800 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">A</div>
                            <div className="w-8 h-8 rounded-full bg-stone-700 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">S</div>
                        </div>

                        {/* Stars and Rating text */}
                        <div className="flex flex-col items-end">
                            <div className="flex text-amber-500 text-xs space-x-0.5 mb-0.5">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <span className="text-xs font-serif text-stone-700"><strong>4.9/5</strong> from our regulars</span>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-115 rounded-4xl overflow-hidden shadow-2xl shadow-primary/10 lg:min-h-150 mb-8 group">
                    {/* Hero Image */}
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=90"
                        alt="Kalea Coffee Experience"
                        className="absolute size-full inset-0 object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Warm Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/30 to-transparent flex flex-col justify-end p-6 text-white">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-300 mb-1">Bole, Addis Ababa</span>
                        <h2 className="font-serif text-2xl font-normal leading-tight mb-2">Made for lingering.</h2>
                        <div className="flex items-center justify-between text-xs text-stone-300 border-t border-white/20 pt-3">
                            <span>Open daily • 7:00 AM — 4:00 PM</span>
                            <span className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-full text-white text-[11px] whitespace-nowrap font-medium border border-white/20">
                                Explore Menu ↓
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}