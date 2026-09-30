'use client'

import { useEffect, useRef, useState } from "react"
import { MenuCard } from '@/components/MenuCard'
import { ArrowDown, Expand, ExpandIcon, LucideExpand, Minimize, Minimize2, Search, Shrink } from "lucide-react"

const categories = ['All', 'Coffee', 'Teas', 'Pastries', 'Brunch', 'Main Course']


export function MenuSection({
    initialItems = []
}: {
    initialItems: any[]

}) {
    const [category, setCategory] = useState('All')
    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('')
    const [isBarCollapsed, setIsBarCollapsed] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    // Filter items based on category and search text
    const filteredItems = initialItems.filter(item => {
        const matchesCategory = category === 'All' || item.category === category;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleExpand = (id: string) => {
        if (expandedIds.includes(id)) {
            setExpandedIds(expandedIds.filter(itemIds => itemIds !== id));
        } else {
            setExpandedIds([...expandedIds, id]);
        }
    };


    return (
        <section id="menu" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
                <div>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-accent">FROM THE ROASTERY & KITCHEN</p>
                    <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">
                        Roasted with intention.
                        <br />
                        <em className="font-normal text-primary">Baked fresh daily.</em>
                    </h2>
                </div>

                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Our offerings celebrate exceptional single-origin beans and seasonal ingredients, prepared in small batches right here in Bole.
                </p>
            </div>

            <div className="sticky top-18 z-30 mb-8 mt-2 transition-all">
                <div className="">
                    {isBarCollapsed ? (
                        <div className="flex items-center justify-between bg-background p-2">
                            <span className="text-xs font-medium text-stone-600">
                                Category: <strong className="text-amber-900">{category}</strong>
                                {searchQuery && ` • Search: "${searchQuery}"`}
                            </span>
                            <button
                                onClick={() => setIsBarCollapsed(false)}
                                className="absolute top-[20%] right-3 rounded-full border border-amber-600 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 transition hover:bg-amber-100"
                            >
                                <LucideExpand className="size-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="relative">
                                {/* Left Fade Indicator (Appears when scrolled right) */}
                                {canScrollLeft && (
                                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background pointer-events-none z-10 transition-opacity duration-300" />
                                )}

                                {/* Right Fade Indicator (Disappears when scrolled all the way right) */}
                                {canScrollRight && (
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background pointer-events-none z-10 transition-opacity duration-300" />
                                )}

                                {/* Your Existing Scroll Container */}
                                <div
                                    ref={scrollRef}
                                    onScroll={checkScroll}
                                    className="flex min-w-0 flex-1 bg-background  items-center gap-1 overflow-x-auto border-b border-stone-300 px-2 py-3 no-scrollbar scroll-smooth"
                                >
                                    {categories.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setCategory(item)}
                                            className={`shrink-0 rounded-full px-3 py-2 text-[13px] font-semibold whitespace-nowrap transition sm:px-4 sm:py-2.5 sm:text-sm ${category === item
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-stone-200/50'
                                                }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-center">
                                <div className="w-full max-w-md h-3 bg-amber-100/10 backdrop-blur-2xl border-x border-stone-300" />
                                <div className="relative w-full max-w-md">
                                    <input
                                        type="text"
                                        placeholder="Search coffees, pastries..."
                                        value={searchQuery}
                                        onChange={(event) => setSearchQuery(event.target.value)}
                                        className="w-full rounded-b-2xl border-x border-b border-stone-300 bg-background/90 backdrop-blur-2xl py-1.5 pl-11 pr-4 text-sm text-stone-800 placeholder-amber-900/50 transition focus:border-amber-800/40 focus:outline-none"
                                    />
                                    <span className="absolute left-4 top-[20%] text-base text-amber-700/70">
                                        <Search className="size-4.5" />
                                    </span>
                                    <button
                                        onClick={() => setIsBarCollapsed(true)}
                                        className="absolute top-[10%] right-4 rounded-full border border-amber-600 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900 transition hover:bg-amber-100"
                                    >
                                        <Shrink className="size-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={filteredItems.length === 0 ? 'mt-8 flex justify-center' : 'mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'}>
                {filteredItems.map((item, index) => {
                    const isCollapsedByDefault = index >= 6;
                    const isExplicitlyExpanded = expandedIds.includes(item.id);
                    const shouldShowAsCollapsed = isCollapsedByDefault && !isExplicitlyExpanded;

                    if (shouldShowAsCollapsed) {
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleExpand(item.id)}
                                className="h-18 flex cursor-pointer items-center justify-between rounded-xl border border-stone-200/80 bg-white pr-2 shadow-sm transition hover:border-amber-800/40 sm:mb-1 md:col-span-1"
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="h-18 w-15 rounded-l-xl object-cover"
                                    />
                                    <div>
                                        <h4 className="mt-1 font-serif text-sm text-stone-900">{item.title}</h4>
                                        <span className="text-xs font-semibold text-amber-900">
                                            ETB {item.price.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center rounded-lg bg-amber-800/10 p-3 text-xs text-amber-950">
                                    <ArrowDown className="h-4 w-4" />
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={item.id} className="relative">
                            {isCollapsedByDefault && (
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="absolute right-3 top-3 z-10 rounded-full bg-stone-900/70 px-2.5 py-1 text-[10px] text-white transition hover:bg-stone-900"
                                >
                                    Collapse ↑
                                </button>
                            )}
                            <MenuCard item={item} />
                        </div>
                    );
                })}

                {filteredItems.length === 0 && (
                    <div className="my-4 w-full max-w-md rounded-2xl border border-dashed border-stone-300 bg-white/50 px-3 py-12 text-center">
                        <p className="mb-1 font-serif text-base text-stone-700">No artisanal items found</p>
                        <p className="mb-4 text-xs text-stone-400">
                            Try searching for something else like "macchiato" or "croissant".
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="rounded-xl bg-[#5D3A1A] px-4 py-2 text-xs text-white"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>
        </section >
    );
}