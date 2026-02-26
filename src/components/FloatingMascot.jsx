import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import androidMascot from '../assets/android-mascot.png';

const FloatingMascot = () => {
    // 0. Interactive "Angry" State
    const [isAngry, setIsAngry] = useState(false);

    // 1. Setup motion values for cursor position (-1 to 1)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Track mouse position across the entire window
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // 3. Smooth the values so the animation feels natural and not jittery
    const smoothOptions = { damping: 40, stiffness: 150 };
    const smoothX = useSpring(mouseX, smoothOptions);
    const smoothY = useSpring(mouseY, smoothOptions);

    // 4. Create transforms for the entire head to give a stronger 3D parallax effect
    // This makes the existing black eyes appear to follow the cursor
    const headRotateX = useTransform(smoothY, [-1, 1], [15, -15]);
    const headRotateY = useTransform(smoothX, [-1, 1], [-25, 25]);
    const headTranslateX = useTransform(smoothX, [-1, 1], [-35, 35]);
    const headTranslateY = useTransform(smoothY, [-1, 1], [-35, 35]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* Outer glow ring */}
            <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl transition-colors duration-300 ${isAngry ? 'bg-red-500/30' : 'bg-primary/20'}`}
            />

            {/* Inner glow ring */}
            <motion.div
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute w-56 h-56 md:w-72 md:h-72 rounded-full blur-2xl transition-colors duration-300 ${isAngry ? 'bg-red-600/40' : 'bg-primary/30'}`}
            />

            {/* Floating Container (handles the up/down float) */}
            <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10 perspective-[1000px]"
            >
                {/* 3D tracking head container (rotates and translates based on cursor) */}
                <motion.div
                    style={{
                        rotateX: headRotateX,
                        rotateY: headRotateY,
                        x: headTranslateX,
                        y: headTranslateY
                    }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isAngry ? {
                        opacity: 1,
                        scale: 1.1,
                        x: [0, -5, 5, -5, 5, 0], // Shake effect when angry
                    } : { opacity: 1, scale: 1 }}
                    transition={isAngry ? { duration: 0.4, repeat: Infinity, repeatType: 'reverse' } : { duration: 0.9, ease: 'easeOut' }}
                    className="relative cursor-pointer"
                    onMouseDown={() => setIsAngry(true)}
                    onMouseUp={() => setIsAngry(false)}
                    onMouseLeave={() => setIsAngry(false)}
                    onTouchStart={() => setIsAngry(true)}
                    onTouchEnd={() => setIsAngry(false)}
                >
                    <img
                        src={androidMascot}
                        alt="Android Mascot"
                        className="w-64 h-auto md:w-80 lg:w-96 select-none relative z-10"
                        draggable={false}
                        style={{
                            // 'hue-rotate(300deg)' turns green into red, 'saturate(1.5)' makes the red intense
                            filter: isAngry
                                ? 'hue-rotate(270deg) saturate(2) brightness(0.8) drop-shadow(0 0 40px rgba(255, 0, 0, 0.8))'
                                : 'drop-shadow(0 0 30px rgba(0, 230, 118, 0.5))',
                            transition: 'filter 0.15s ease-out'
                        }}
                    />

                </motion.div>
            </motion.div>

            {/* Orbiting dot decorations */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-64 h-64 md:w-80 md:h-80 pointer-events-none"
            >
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full transition-colors duration-300 ${isAngry ? 'bg-red-500 shadow-[0_0_12px_rgba(255,0,0,0.8)]' : 'bg-primary shadow-[0_0_12px_rgba(0,230,118,0.8)]'}`} />
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${isAngry ? 'bg-red-500/60 shadow-[0_0_8px_rgba(255,0,0,0.6)]' : 'bg-primary/60 shadow-[0_0_8px_rgba(0,230,118,0.6)]'}`} />
            </motion.div>

            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-80 h-80 md:w-96 md:h-96 pointer-events-none"
            >
                <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors duration-300 ${isAngry ? 'bg-red-500/40 shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'bg-primary/40 shadow-[0_0_8px_rgba(0,230,118,0.5)]'}`} />
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isAngry ? 'bg-red-500/60' : 'bg-primary/60'}`} />
            </motion.div>
        </div>
    );
};

export default FloatingMascot;
