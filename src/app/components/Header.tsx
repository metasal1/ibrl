import EmbedTweet from "./EmbedTweet";
import Tools from "./Tools";

export default function Header() {
    return <div className="relative max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-[12rem] font-extrabold text-center mb-12 tracking-wider thick-text uppercase"
            style={{
                background: 'linear-gradient(to bottom right, #F74C30, #8B2213)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 4px 8px rgba(247, 76, 48, 0.5))'
            }}
        >
            IBRL
        </h1>

        <h1 className="text-4xl md:text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#F74C30] to-[#8B2213]">
            Increase Bandwidth
            Reduce Latency
        </h1>
        <Tools />
        <EmbedTweet />
    </div>
}
