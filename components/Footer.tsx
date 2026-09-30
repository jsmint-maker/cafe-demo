import { Send, Video } from "lucide-react";
import { SiInstagram, SiTelegram, SiTiktok } from "react-icons/si";

export function Footer() {
    return (
        <footer className="w-full py-8 px-6 md:px-12 bg-[#FAF9F5] border-t border-stone-200/60 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            {/* Left Brand Identifier */}
            <div className="flex items-center space-x-2">
                <span className="font-serif font-medium text-stone-800 text-sm">Kalea Coffee & Roastery</span>
            </div>

            {/* Center Copyright */}
            <div>
                <p>© {new Date().getFullYear()} Kalea Coffee Co. All rights reserved.</p>
            </div>

            {/* Right Social Link */}
            {/* Right Social Links with Icons */}
            <div className="flex items-center space-x-5">
                {/* Instagram */}
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-stone-900 transition"
                    aria-label="Instagram"
                >
                    <SiInstagram className="size-4 text-stone-700" />
                    <span className="hidden sm:inline">Instagram</span>
                </a>

                <a
                    href="https://telegram.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-stone-900 transition"
                    aria-label="Telegram"
                >
                    <SiTelegram className="size-3.5 text-stone-700" />
                    <span className="hidden sm:inline">Telegram</span>
                </a>

                <a
                    href="https://tiktok.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-stone-900 transition"
                    aria-label="TikTok"
                >
                    <SiTiktok className="size-4 text-stone-700" />
                    <span className="hidden sm:inline">TikTok</span>
                </a>
            </div>
        </footer>
    )
}