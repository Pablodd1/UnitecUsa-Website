const translationCache = new Map();

export async function translateText(text, targetLang = 'es', sourceLang = 'es') {
    if (!text || (targetLang === sourceLang)) return text;
    
    const cacheKey = `${text.slice(0, 50)}_${targetLang}`;
    
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey);
    }
    
    try {
        const encodedText = encodeURIComponent(text);
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`
        );
        
        if (!response.ok) {
            throw new Error('Translation failed');
        }
        
        const data = await response.json();
        
        if (data.responseStatus === 200 && data.responseData?.translatedText) {
            const translatedText = data.responseData.translatedText;
            translationCache.set(cacheKey, translatedText);
            return translatedText;
        }
    } catch (error) {
        console.error('Translation error:', error);
    }
    
    return text;
}

export async function translateObject(obj, targetLang = 'es') {
    if (!obj || targetLang === 'en') return obj;
    
    const translated = { ...obj };
    
    if (translated.description) {
        translated.description = await translateText(translated.description, targetLang);
    }
    
    if (translated.name) {
        translated.name = await translateText(translated.name, targetLang);
    }
    
    return translated;
}
