import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const AboutMe = () => {
    const { data } = useLanguage();

    if (!data || !data.aboutMe) return null;

    return (
        <section id="about" className="py-24 px-6 relative border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24">
                {/* Left Side: Title */}
                <div className="md:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl xl:text-4xl font-outfit font-bold mb-4">{data.aboutMe.title}</h2>
                        <div className="w-16 h-1 bg-primary rounded-full"></div>
                    </motion.div>
                </div>

                {/* Right Side: Description and Stats */}
                <div className="md:w-2/3">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg xl:text-xl text-muted mb-12 leading-relaxed"
                    >
                        {data.aboutMe.description}
                    </motion.p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {data.aboutMe.stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                                className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors flex flex-col justify-center"
                            >
                                <span className="text-3xl xl:text-4xl font-outfit font-bold text-primary mb-2">{stat.value}</span>
                                <span className="text-xs font-semibold text-text-main tracking-wider uppercase leading-snug">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
