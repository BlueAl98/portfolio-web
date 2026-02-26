import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Skills = () => {
    const { common, data } = useLanguage();

    if (!data || !common) return null;

    return (
        <section id="skills" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4 flex items-center gap-4">
                        <span className="w-8 h-1 bg-primary"></span>
                        {data.skillTitle}
                    </h2>
                </div>

                <div className="skills-grid">
                    {common.skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05, borderColor: 'rgba(0, 230, 118, 0.4)' }}
                            className="glass p-6 flex flex-col items-center justify-center gap-4 group transition-all duration-300"
                        >
                            <i className={`${skill.icon} text-4xl group-hover:text-primary transition-colors`}></i>
                            <span className="text-sm font-medium text-muted group-hover:text-white">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
