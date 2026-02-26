import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Languages, Menu, X } from 'lucide-react';

const Navbar = () => {
    const { lang, toggleLanguage, data } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    if (!data) return null;

    const navLinks = [
        { href: '#skills', label: data.skillTitle },
        { href: '#experience', label: data.experience.title },
        { href: '#contact', label: lang === 'en' ? 'Contact' : 'Contacto' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold font-outfit text-sm group-hover:scale-110 transition-transform">
                        N
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight hidden sm:block">
                        Najib<span className="text-primary">.dev</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted hover:text-white hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-primary after:transition-all hover:after:w-full"
                        >
                            {link.label}
                        </a>
                    ))}

                    <div className="h-6 w-[1px] bg-white/10"></div>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors border border-white/10"
                        title="Toggle Language"
                    >
                        <Languages size={18} className="text-primary" />
                        <span className="text-sm font-semibold uppercase tracking-wider">{lang}</span>
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3">
                    <button onClick={toggleLanguage} className="flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <Languages size={16} className="text-primary" />
                        <span className="text-xs font-bold uppercase">{lang}</span>
                    </button>
                    <button onClick={() => setMenuOpen(v => !v)} className="p-1 hover:text-primary transition-colors">
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden mt-2 glass mx-0 rounded-2xl overflow-hidden">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="block px-6 py-4 text-sm font-medium text-muted hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
