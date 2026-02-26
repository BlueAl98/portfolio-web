import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, FolderOpen, GraduationCap, ChevronRight, ExternalLink } from 'lucide-react';

const Experience = () => {
    const { data } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);

    if (!data || !data.experience) return null;

    const tabs = [
        { id: 'companies', label: data.experience.tabsTitle[0], icon: <Briefcase size={20} /> },
        { id: 'projects', label: data.experience.tabsTitle[1], icon: <FolderOpen size={20} /> },
        { id: 'certificates', label: data.experience.tabsTitle[2], icon: <GraduationCap size={20} /> }
    ];

    const renderContent = () => {
        const section = tabs[activeTab].id;
        const items = data.experience.cardsExperience[section];

        if (section === 'companies') {
            return items.map((company, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-8 mb-6 relative overflow-hidden group"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-16 h-16 rounded-xl bg-white/5 p-3 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                            <img src={company.urlImage} alt="logo" className="max-w-full max-h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-primary font-outfit text-sm font-bold tracking-widest uppercase">{company.date}</span>
                            </div>
                            <ul className="space-y-3">
                                {company.info.map((point, i) => (
                                    <li key={i} className="flex gap-3 text-muted leading-relaxed">
                                        <ChevronRight size={16} className="text-primary mt-1 shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            ));
        }

        if (section === 'projects') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-6 flex flex-col group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-lg bg-white/5 p-2 flex items-center justify-center border border-white/10 group-hover:bg-primary/10 group-hover:border-primary/30 transition-all">
                                    <img src={project.urlImage} alt="" className="w-full h-full object-contain" />
                                </div>
                                <div>
                                    <h4 className="font-outfit font-bold">{project.text}</h4>
                                </div>
                            </div>
                            <ul className="space-y-2 mb-6 flex-1">
                                {project.info.slice(0, 3).map((point, i) => (
                                    <li key={i} className="text-sm text-muted flex gap-2">
                                        <span className="text-primary">•</span>
                                        <span className="line-clamp-2">{point}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="text-sm font-bold text-primary flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                {data.experience.btnText} <ExternalLink size={14} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            );
        }

        if (section === 'certificates') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((cert, idx) => (
                        <motion.a
                            key={idx}
                            href={cert.urlPdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-5 flex flex-col items-center text-center group"
                        >
                            <div className="w-full aspect-[4/3] rounded-lg bg-white/5 mb-4 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors overflow-hidden">
                                <img src={cert.imageUrl} alt="" className="w-16 h-16 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">{cert.title}</h4>
                        </motion.a>
                    ))}
                </div>
            );
        }
    };

    return (
        <section id="experience" className="py-24 px-6 bg-white/[0.02]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-4">{data.experience.title}</h2>
                    <p className="text-muted max-w-2xl">{data.experience.info}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-12 p-1.5 glass w-fit rounded-xl">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(idx)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === idx
                                ? 'bg-primary text-black'
                                : 'text-muted hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Experience;
