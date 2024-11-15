import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updatePosition);
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.body.style.cursor = 'auto';
        };
    }, []);

    return (
        <>
            <div
                className="fixed pointer-events-none z-50 mix-blend-difference"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[#F74C30] blur-xl opacity-30 animate-pulse" />
                    <div className="w-16 h-16 rounded-full bg-[#F74C30] blur-md opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <div className="w-8 h-8 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>
        </>
    );
};

export default CustomCursor; 
