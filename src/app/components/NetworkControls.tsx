import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Gauge, Twitter, Send } from 'lucide-react';
import ComingSoon from './ComingSoon';
import CustomCursor from './CustomCursor';

const style = document.createElement('style');
style.textContent = `
  .thick-text {
    -webkit-text-stroke: 2px #F74C30;
    text-shadow: 
      3px 3px 0 #8B2213,
      -1px -1px 0 #8B2213,  
      1px -1px 0 #8B2213,
      -1px 1px 0 #8B2213,
      1px 1px 0 #8B2213;
  }

  @media (min-width: 768px) {
    .thick-text {
      -webkit-text-stroke: 4px #F74C30;
    }
  }

  @keyframes wave1 {
    0% { transform: translateX(0); }
    100% { transform: translateX(100%); }
  }
  
  @keyframes wave2 {
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
  }

  .animate-wave1 {
    animation: wave1 10s linear infinite;
  }

  .animate-wave2 {
    animation: wave2 8s linear infinite;
  }

  .ribbon {
    position: fixed;
    right: -50px;
    top: 30px;
    transform: rotate(45deg);
    background: linear-gradient(45deg, #F74C30, #8B2213);
    padding: 8px 40px;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: all 0.3s ease;
  }

  .ribbon:hover {
    padding: 8px 50px;
    background: #F74C30;
  }
`;
document.head.appendChild(style);

const NetworkControls = () => {
    const [bandwidth, setBandwidth] = useState(69);
    const [latency, setLatency] = useState(400);
    const bandwidthInterval = useRef<NodeJS.Timeout | null>(null);
    const latencyInterval = useRef<NodeJS.Timeout | null>(null);

    const startIncreaseBandwidth = () => {
        if (!bandwidthInterval.current) {
            bandwidthInterval.current = setInterval(() => {
                setBandwidth((prev: number) => Math.min(prev + 2, 1000));
            }, 50);
        }
    };

    const stopIncreaseBandwidth = () => {
        if (bandwidthInterval.current) {
            clearInterval(bandwidthInterval.current);
            bandwidthInterval.current = null;
            const decreaseInterval = setInterval(() => {
                setBandwidth(prev => {
                    if (prev <= 69) {
                        clearInterval(decreaseInterval);
                        return 69;
                    }
                    return prev - 1;
                });
            }, 50);
        }
    };

    const startReduceLatency = () => {
        if (!latencyInterval.current) {
            latencyInterval.current = setInterval(() => {
                setLatency(prev => Math.max(prev - 1, 0));
            }, 50);
        }
    };

    const stopReduceLatency = () => {
        if (latencyInterval.current) {
            clearInterval(latencyInterval.current);
            latencyInterval.current = null;
            const increaseInterval = setInterval(() => {
                setLatency(prev => {
                    if (prev >= 400) {
                        clearInterval(increaseInterval);
                        return 400;
                    }
                    return prev + 1;
                });
            }, 50);
        }
    };

    useEffect(() => {
        return () => {
            if (bandwidthInterval.current) clearInterval(bandwidthInterval.current);
            if (latencyInterval.current) clearInterval(latencyInterval.current);
        };
    }, []);

    const bandwidthPercentage = ((bandwidth - 69) / (1000 - 69)) * 100;
    const latencyPercentage = (latency / 400) * 100;

    return (
        <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat text-white p-4 md:p-8">
            <CustomCursor />

            <a
                href="https://t.me/addstickers/IBRLsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="ribbon font-bold text-white no-underline"
            >
                Get Stickers
            </a>

            {/* Background overlay for better text readability */}
            <div className="fixed inset-0 bg-black/50 pointer-events-none" />

            {/* Decorative elements with new colors */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-full opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F74C30] rounded-full filter blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B2213] rounded-full filter blur-[150px]" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto">
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

                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#F74C30] to-[#8B2213]">
                    Increase Bandwidth
                </h1>
                <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#F74C30] to-[#8B2213]">
                    Reduce Latency
                </h1>
                <ComingSoon />
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                    {/* Bandwidth Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                        <div className="flex flex-col items-center space-y-4">
                            <h2 className="text-2xl font-bold text-[#F74C30]">Bandwidth</h2>
                            <div className="text-4xl font-bold text-white">{bandwidth.toFixed(0)} Mbps</div>
                            <div className="w-full h-48 md:h-64 bg-black/30 rounded-xl relative overflow-hidden">
                                <div
                                    className="absolute bottom-0 w-full transition-all duration-300 ease-out"
                                    style={{
                                        height: `${bandwidthPercentage}%`,
                                        background: `linear-gradient(180deg, 
                      rgba(247, 76, 48, 0.7) 0%,
                      rgba(247, 76, 48, 0.3) 100%)`
                                    }}
                                >
                                    <div className="absolute w-full h-full animate-wave1 opacity-60"
                                        style={{
                                            background: `repeating-linear-gradient(45deg,
                        transparent,
                        transparent 10px,
                        rgba(247, 76, 48, 0.5) 10px,
                        rgba(247, 76, 48, 0.5) 20px)`
                                        }}
                                    />
                                    <div className="absolute w-full h-full animate-wave2 opacity-40"
                                        style={{
                                            background: `repeating-linear-gradient(-45deg,
                        transparent,
                        transparent 10px,
                        rgba(247, 76, 48, 0.5) 10px,
                        rgba(247, 76, 48, 0.5) 20px)`
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                onMouseDown={startIncreaseBandwidth}
                                onMouseUp={stopIncreaseBandwidth}
                                onMouseLeave={stopIncreaseBandwidth}
                                onTouchStart={startIncreaseBandwidth}
                                onTouchEnd={stopIncreaseBandwidth}
                                className="w-full md:w-2/3 h-14 text-lg bg-[#F74C30] hover:bg-[#F74C30]/80 text-white font-bold transition-transform hover:scale-105"
                            >
                                <Activity className="w-6 h-6 mr-2" />
                                Increase Bandwidth
                            </Button>
                        </div>
                    </div>

                    {/* Latency Section */}
                    <div className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                        <div className="flex flex-col items-center space-y-4">
                            <h2 className="text-2xl font-bold text-[#8B2213]">Latency</h2>
                            <div className="text-4xl font-bold text-white">{latency.toFixed(0)} ms</div>
                            <div className="w-full h-48 md:h-64 bg-black/30 rounded-xl relative overflow-hidden">
                                <div
                                    className="absolute bottom-0 w-full transition-all duration-300 ease-out"
                                    style={{
                                        height: `${latencyPercentage}%`,
                                        background: `linear-gradient(180deg, 
                      rgba(139, 34, 19, 0.7) 0%,
                      rgba(139, 34, 19, 0.3) 100%)`
                                    }}
                                >
                                    <div className="absolute w-full h-full animate-pulse opacity-50"
                                        style={{
                                            background: `repeating-linear-gradient(0deg,
                        transparent,
                        rgba(139, 34, 19, 0.5) 50%,
                        transparent 100%)`
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                onMouseDown={startReduceLatency}
                                onMouseUp={stopReduceLatency}
                                onMouseLeave={stopReduceLatency}
                                onTouchStart={startReduceLatency}
                                onTouchEnd={stopReduceLatency}
                                className="touch-none w-full md:w-2/3 h-14 text-lg bg-[#8B2213] hover:bg-[#8B2213]/80 text-white font-bold transition-transform hover:scale-105"
                            >
                                <Gauge className="w-6 h-6 mr-2" />
                                Reduce Latency
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-center mt-8 sticky bottom-0 pb-4">
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
                </div>
            </footer>
        </div>
    );
};

export default NetworkControls;
