import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Activity, Gauge } from 'lucide-react';

const NetworkControls = () => {
    const [bandwidth, setBandwidth] = useState(69);
    const [latency, setLatency] = useState(400);
    const bandwidthInterval = useRef<NodeJS.Timeout | null>(null);
    const latencyInterval = useRef<NodeJS.Timeout | null>(null);

    const startIncreaseBandwidth = () => {
        if (!bandwidthInterval.current) {
            bandwidthInterval.current = setInterval(() => {
                setBandwidth((prev: number) => Math.min(prev + 2, 100));
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
            }, 5);
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
            }, 10);
        }
    };

    useEffect(() => {
        return () => {
            if (bandwidthInterval.current) clearInterval(bandwidthInterval.current);
            if (latencyInterval.current) clearInterval(latencyInterval.current);
        };
    }, []);

    // Modified calculation to show 69% as starting point
    const bandwidthPercentage = Math.max(69, ((bandwidth - 69) / (100 - 69)) * 100);
    const latencyPercentage = (latency / 400) * 100;

    return (
        <div className="min-h-screen w-full bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat text-white p-4 md:p-8">
            <div className="fixed inset-0 bg-black/50 pointer-events-none" />

            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-full opacity-5">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F74C30] rounded-full filter blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B2213] rounded-full filter blur-[150px]" />
                </div>
            </div>

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
                            className="w-full md:w-2/3 h-14 text-lg bg-[#F74C30] hover:bg-[#ff0000] text-white font-bold transition-transform hover:scale-105"
                        >
                            <Activity className="w-6 h-6 mr-2 animate-pulse select-none" />
                            <span className="select-none">
                                Increase Bandwidth
                            </span>
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
                                <div className="absolute w-full h-full animate-latency"
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
                            className="touch-none w-full md:w-2/3 h-14 text-lg bg-[#ff0000] hover:bg-[#8B2213]/80 text-white font-bold transition-transform hover:scale-105"
                        >
                            <Gauge className="w-6 h-6 mr-2" />
                            <span className="select-none">
                                Reduce Latency
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NetworkControls;
