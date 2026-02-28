import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import FloatingMascot from './FloatingMascot';
import { Download, ChevronRight } from 'lucide-react';


const Hero = () => {
    const { data } = useLanguage();

    if (!data) return null;

    return (
        <section className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6"
                    >
                        {data.description.greeting}
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl font-outfit font-extrabold mb-6 leading-tight">
                        {data.profile.im} <span className="text-primary">{data.profile.name.split(' ')[0]}</span> <br />
                        {data.profile.name.split(' ').slice(1).join(' ')}
                    </h1>

                    <h2 className="text-xl md:text-2xl text-muted font-medium mb-8 flex items-center gap-3">
                        <span className="w-12 h-[1px] bg-primary/50"></span>
                        {data.profile.carrer}
                    </h2>

                    <p className="text-lg text-text-muted mb-10 max-w-xl leading-relaxed">
                        {data.description.me}
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a href={data.description.urlCV} className="btn-primary" download>
                            <Download size={20} />
                            {data.description.btnText}
                        </a>
                        <a href="#experience" className="px-6 py-3 rounded-12 border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 font-medium">
                            View Work
                            <ChevronRight size={20} />
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative h-[400px] md:h-[600px] w-full"
                >
                    <div className="absolute inset-0 primary-glow pointer-events-none"></div>
                    <FloatingMascot />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
