import EmbedTweet from "./EmbedTweet";
import Tools from "./Tools";
import { FaTwitter, FaTelegram } from "react-icons/fa";
import { SiEagle } from "react-icons/si";

export default function Header() {
    return <div className="relative max-w-7xl mx-auto">
        <h1 className="text-7xl md:text-[12rem] font-extrabold text-center mb-12 tracking-wider thick-text uppercase"
            style={{
                background: 'linear-gradient(to bottom right, #F74C30, #8B2213)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 8px rgba(247, 76, 48, 0.5))'
            }}
        >
            IBRL
        </h1>

        <h1 className="text-4xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#FF0000] to-[#00FF00]">
            Increase Bandwidth
            Reduce Latency
        </h1>

        <div className="flex justify-center gap-6 mb-8">
            <a
                href="https://twitter.com/IBRLSolana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F74C30] hover:text-[#8B2213] transition-colors duration-200"
            >
                <FaTwitter size={64} />
            </a>
            <a
                href="https://t.me/IBRLsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F74C30] hover:text-[#8B2213] transition-colors duration-200"
            >
                <FaTelegram size={64} />
            </a>
            <a
                href="https://dexscreener.com/solana/4dvyxv8kxhfpww2yrwl1wdauud4kfxqkridf3y33zg59"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F74C30] hover:text-[#8B2213] transition-colors duration-200"
            >
                <SiEagle size={64} />
            </a>
        </div>
        <div onClick={() => navigator.clipboard.writeText('E7tuVmCywD2UzrDomUQWgmpVWfA4qjFyRb9EDX5wpump')}>
            <code className="flex justify-center hover:cursor-pointer hover:text-[#8B2213] transition-colors duration-200">
                E7tuVmCywD2UzrDomUQWgmpVWfA4qjFyRb9EDX5wpump
            </code>
        </div>
        <Tools />
        <EmbedTweet />
    </div>
}
