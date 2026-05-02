document.addEventListener('DOMContentLoaded', () => {
    const dataGrid = document.getElementById('data-grid');
    const newsFeed = document.getElementById('news-feed');
    const themeBtn = document.getElementById('theme-btn');
    const langSelector = document.getElementById('lang-selector');
    const currentDateEl = document.getElementById('current-date');
    const body = document.body;

    // Language Selector Logic (Improved with MutationObserver)
    const syncTranslation = (lang) => {
        const googleCombo = document.querySelector('.goog-te-combo');
        if (googleCombo) {
            if (googleCombo.value !== lang) {
                googleCombo.value = lang;
                googleCombo.dispatchEvent(new Event('change', { bubbles: true }));
                console.log('Syncing translation to:', lang);
            }
        }
    };

    const updateDate = (lang) => {
        const locales = {
            'en': 'en-US',
            'ko': 'ko-KR',
            'ja': 'ja-JP',
            'es': 'es-ES',
            'ar': 'ar-SA'
        };
        const locale = locales[lang] || 'en-US';
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateEl.textContent = new Date().toLocaleDateString(locale, options);
    };

    langSelector.addEventListener('change', () => {
        const lang = langSelector.value;
        syncTranslation(lang);
        updateDate(lang);
    });

    // Observer to handle Google Translate's late loading
    const observer = new MutationObserver(() => {
        const googleCombo = document.querySelector('.goog-te-combo');
        if (googleCombo) {
            const desiredLang = langSelector.value;
            if (googleCombo.value !== desiredLang) {
                syncTranslation(desiredLang);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial check and Date setup
    updateDate(langSelector.value);
    syncTranslation(langSelector.value);

    // Theme Toggle Logic
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.textContent = 'Light Mode';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        let theme = 'light';
        if (body.classList.contains('dark-mode')) {
            theme = 'dark';
            themeBtn.textContent = 'Light Mode';
        } else {
            themeBtn.textContent = 'Dark Mode';
        }
        localStorage.setItem('theme', theme);
    });

    // EPC Industrial Indicators Configuration (World Bank)
    const indicators = [
        { id: 'POILWTI', title: 'Crude Oil (WTI)', type: 'currency_bbl', desc: 'US dollars per barrel' },
        { id: 'PCOPP', title: 'Copper Price', type: 'currency_mt', desc: 'US dollars per metric ton' },
        { id: 'PSTEL', title: 'Steel Index', type: 'index', desc: 'Steel products price index' },
        { id: 'PNGASEU', title: 'Natural Gas (EU)', type: 'currency_mmbtu', desc: 'US dollars per MMBtu' },
        { id: 'EG.ELC.RNEW.ZS', title: 'Renewable Energy', type: 'percent', desc: '% of total electricity output' },
        { id: 'PALLMNG', title: 'Aluminum Index', type: 'index', desc: 'Aluminum price index' }
    ];

    async function fetchIndicatorData(indicatorId) {
        try {
            // Fetching global commodity data for multiple years
            const response = await fetch(`https://api.worldbank.org/v2/indicator/${indicatorId}?format=json&per_page=12`);
            const data = await response.json();
            
            if (data && data[1]) {
                const validRecord = data[1].find(record => record.value !== null);
                return validRecord || null;
            }
            return null;
        } catch (error) {
            console.error(`Error fetching data for ${indicatorId}:`, error);
            return null;
        }
    }

    function formatValue(value, type) {
        if (value === null || value === undefined) return 'N/A';
        const numValue = parseFloat(value);
        switch (type) {
            case 'currency_bbl': return '$' + numValue.toFixed(2) + ' /bbl';
            case 'currency_mt': return '$' + Math.round(numValue).toLocaleString() + ' /mt';
            case 'currency_mmbtu': return '$' + numValue.toFixed(2) + ' /mmbtu';
            case 'index': return numValue.toFixed(2) + ' pts';
            case 'percent': return numValue.toFixed(2) + '%';
            default: return numValue.toString();
        }
    }

    function createStatItem(indicator, data) {
        const item = document.createElement('div');
        item.classList.add('stat-item');
        const value = data ? formatValue(data.value, indicator.type) : 'N/A';
        const year = data ? `Latest Record: ${data.date}` : 'Awaiting data...';
        item.innerHTML = `
            <div class="stat-title">${indicator.title}</div>
            <div class="stat-value">${value}</div>
            <div class="stat-year">${year}</div>
        `;
        return item;
    }

    async function fetchNews() {
        try {
            const response = await fetch('https://ok.surf/api/v1/cors/news-feed');
            const data = await response.json();
            
            // Filter and prioritize news related to EPC and Industry
            const combinedNews = [
                ...(data.Business || []),
                ...(data.Science || []),
                ...(data.World || [])
            ];

            const epcKeywords = ['hydrogen', 'lng', 'carbon', 'modular', 'epc', 'infrastructure', 'offshore', 'energy', 'oil', 'gas', 'construction', 'engineering'];
            
            const filteredNews = combinedNews.filter(article => {
                const title = article.title.toLowerCase();
                return epcKeywords.some(keyword => title.includes(keyword));
            });

            // If filtering results in too few articles, just use top business news
            return filteredNews.length >= 5 ? filteredNews.slice(0, 10) : combinedNews.slice(0, 10);
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }

    function createNewsItem(article) {
        const item = document.createElement('article');
        item.classList.add('news-item');
        item.innerHTML = `
            <div class="news-meta">${article.source || 'Industrial Report'}</div>
            <h3 class="news-title"><a href="${article.link}" target="_blank">${article.title}</a></h3>
            <p class="news-description">${article.title.substring(0, 120)}...</p>
        `;
        return item;
    }

    async function initIndustrialist() {
        const statPromises = indicators.map(async (indicator) => {
            const data = await fetchIndicatorData(indicator.id);
            return { indicator, data };
        });

        const newsPromise = fetchNews();

        const [statResults, newsArticles] = await Promise.all([
            Promise.all(statPromises),
            newsPromise
        ]);

        dataGrid.innerHTML = '';
        statResults.forEach(({ indicator, data }) => {
            dataGrid.appendChild(createStatItem(indicator, data));
        });

        newsFeed.innerHTML = '';
        if (newsArticles.length > 0) {
            newsArticles.forEach(article => {
                newsFeed.appendChild(createNewsItem(article));
            });
        } else {
            newsFeed.innerHTML = '<div class="loading-state">EPC news feed temporarily unavailable.</div>';
        }
    }

    initIndustrialist();
});
