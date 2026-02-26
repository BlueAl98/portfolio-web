import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
import Experience from './components/Experience';
import { useLanguage } from './context/LanguageContext';

function App() {
    const { data } = useLanguage();
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
                        <a href="mailto:najib_loera@hotmail.com" className="btn-primary text-lg px-10 py-4">
                            Get In Touch ✉
                        </a>
                    </div>
                </section>
            </main>

            <footer className="py-12 px-6 border-t border-white/5 text-center text-sm text-muted">
                <p>© {new Date().getFullYear()} Najib Alejandro Loera Rodriguez. All rights reserved.</p>
                <p className="mt-2 opacity-50">Culiacán, México • Computer Systems Engineer</p>
            </footer>
        </div>
    );
}

export default App;
