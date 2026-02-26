import React from 'react';
import { motion } from 'framer-motion';
import androidMascot from '../assets/android-mascot.png';

const FloatingMascot = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">

            {/* Outer glow ring */}
            <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/20 blur-3xl"
            />

            {/* Inner glow ring */}
            <motion.div
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full bg-primary/30 blur-2xl"
            />

            {/* Android character image with float animation */}
            <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
            >
                <motion.img
                    src={androidMascot}
                    alt="Android Mascot"
                    initial={{ opacity: 0, scale: 0.7, rotateY: -15 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 0.9, ease: 'easeOut' }}
                    className="w-64 h-auto md:w-80 lg:w-96 drop-shadow-[0_0_40px_rgba(0,230,118,0.6)] select-none"
                    draggable={false}
                    style={{ filter: 'drop-shadow(0 0 30px rgba(0, 230, 118, 0.5))' }}
                />
            </motion.div>

            {/* Orbiting dot decorations */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute w-64 h-64 md:w-80 md:h-80"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(0,230,118,0.8)]" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/60 shadow-[0_0_8px_rgba(0,230,118,0.6)]" />
            </motion.div>

            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                className="absolute w-80 h-80 md:w-96 md:h-96"
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_8px_rgba(0,230,118,0.5)]" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/60" />
            </motion.div>
        </div>
    );
};

export default FloatingMascot;
