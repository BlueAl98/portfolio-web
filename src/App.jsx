import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

function App() {
    const { data, common } = useLanguage();
    if (!data) return null;
    return (
        <div className="relative min-h-screen bg-bg-dark text-white selection:bg-primary/30 scroll-smooth">
            <Navbar />
            <main>
                <Hero />
                <AboutMe />
                <Skills />
                <Experience />

                <section id="contact" className="py-24 px-6 text-center overflow-hidden relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[150px] -z-10 pointer-events-none"></div>
                    <div className="max-w-3xl mx-auto glass p-12 md:p-20 relative overflow-hidden">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6">{data.description.status}</span>
                        <h2 className="text-4xl md:text-6xl font-outfit font-extrabold mb-8 leading-tight">
                            Ready to build something <span className="text-primary">amazing?</span>
                        </h2>
                        <p className="text-xl text-muted mb-12">
                            {data.description.me}
                        </p>
                        <a href="mailto:alejandrorod35@gmail.com?subject=Let%27s%20work%20together" className="btn-primary text-lg px-10 py-4">
                            {data.description.contactBtnText} ✉
                        </a>
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <a
                                href={common.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                title="GitHub"
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-primary hover:border-primary/40 hover:bg-white/5 transition-colors"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={common.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                title="LinkedIn"
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-primary hover:border-primary/40 hover:bg-white/5 transition-colors"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={common.social.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                title={`WhatsApp: ${common.social.phoneDisplay}`}
                                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-muted hover:text-primary hover:border-primary/40 hover:bg-white/5 transition-colors"
                            >
                                <MessageCircle size={20} />
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 px-6 border-t border-white/5 text-center text-sm text-muted">
                <p>© {new Date().getFullYear()} Najib Alejandro Loera Rodriguez. All rights reserved.</p>
                <p className="mt-2 opacity-50">Durango, México • Computer Systems Engineer</p>
            </footer>
        </div>
    );
}

export default App;
