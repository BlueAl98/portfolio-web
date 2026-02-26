import React, { createContext, useState, useContext, useEffect } from 'react';
import portfolioData from '../data/portfolioData.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const [data, setData] = useState(portfolioData[lang]);
    const [common, setCommon] = useState(portfolioData.general);

    useEffect(() => {
        setData(portfolioData[lang]);
    }, [lang]);

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'es' : 'en'));
    };

    if (!data || !common) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ lang, data, common, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
