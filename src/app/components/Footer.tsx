import { Twitter, Send } from 'lucide-react';


export default function Footer() {
    return <footer className="text-center mt-8 pb-4">
        <p className="mb-4">© 2024 IBRL</p>
        <div className="flex justify-center gap-4">
            <a
                href="https://x.com/IBRLonsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F74C30] transition-colors"
            >
                <Twitter className="w-6 h-6" />
            </a>
            <a
                href="https://t.me/IBRLsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F74C30] transition-colors"
            >
                <Send className="w-6 h-6" />
            </a>
            <a
                href="https://www.figma.com/design/b0D9HDYxrUOyFlddz6UGNn/Untitled?node-id=0-1&t=fmHSsbfnEU7T8YN8-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#F74C30] transition-colors"
            >
                Make Stickers
            </a>
        </div>
    </footer>
}
