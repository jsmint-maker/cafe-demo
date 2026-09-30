'use client'

import { useState } from 'react';
import AboutModal from '@/components/AboutModal';

export function StorySection() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    return (
        <section id="story" className="border-y border-border bg-primary text-primary-foreground">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
                <div>
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-accent">Our story</p>
                    <h2 className="font-serif text-4xl leading-tight sm:text-6xl">
                        Rooted in the
                        <br />
                        <em className="font-normal text-accent">good stuff.</em>
                    </h2>
                </div>

                <div className="max-w-xl">
                    <p className="text-xl leading-relaxed text-primary-foreground/85">
                        Kalea Coffee began with two friends, a shared love of exceptional single-origin beans,
                        and a belief that the best part of the day in Bole should never be rushed.
                    </p>
                    <p className="mt-6 leading-relaxed text-primary-foreground/65">
                        We work closely with local farmers, bakers, and growers who care as much as we do.
                        The result is simple food, world-class coffee, and a room that feels entirely like yours.
                    </p>
                    <button
                        onClick={() => setIsAboutOpen(true)}
                        className="mt-5 inline-flex items-center text-amber-500 text-sm font-medium hover:text-white transition group cursor-pointer"
                    >
                        <span>More about us</span>
                        <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </button>

                    {/* Place the modal component anywhere in your JSX tree */}
                    <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
                </div>
            </div>
        </section>
    )
}