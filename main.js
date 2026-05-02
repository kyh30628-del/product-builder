document.addEventListener('DOMContentLoaded', () => {
    const dataGrid = document.getElementById('data-grid');
    const newsFeed = document.getElementById('news-feed');
    const themeBtn = document.getElementById('theme-btn');
    const currentDateEl = document.getElementById('current-date');
    const body = document.body;

    // Set Current Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateEl.textContent = new Date().toLocaleDateString('en-US', options);

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

    // World Bank Indicators Configuration
    const indicators = [
        { id: 'SP.POP.TOTL', title: 'Global Population', type: 'number' },
        { id: 'NY.GDP.MKTP.KD.ZG', title: 'GDP Growth', type: 'percent' },
        { id: 'SP.DYN.LE00.IN', title: 'Life Expectancy', type: 'years' },
        { id: 'SI.POV.DDAY', title: 'Poverty Rate', type: 'percent' },
        { id: 'EN.ATM.CO2E.PC', title: 'CO2 Emissions', type: 'decimal' },
        { id: 'SE.ADT.LITR.ZS', title: 'Literacy Rate', type: 'percent' }
    ];

    async function fetchIndicatorData(indicatorId) {
        try {
            // Fetching global data (region: WLD) for multiple years to ensure we get a non-null value
            const response = await fetch(`https://api.worldbank.org/v2/country/WLD/indicator/${indicatorId}?format=json&per_page=10`);
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
            case 'number':
                if (numValue >= 1000000000) return (numValue / 1000000000).toFixed(2) + ' B';
                if (numValue >= 1000000) return (numValue / 1000000).toFixed(2) + ' M';
                return numValue.toLocaleString();
            case 'percent': return numValue.toFixed(2) + '%';
            case 'years': return numValue.toFixed(1) + ' Yrs';
            case 'decimal': return numValue.toFixed(2);
            default: return numValue.toString();
        }
    }

    function createStatItem(indicator, data) {
        const item = document.createElement('div');
        item.classList.add('stat-item');
        const value = data ? formatValue(data.value, indicator.type) : 'N/A';
        const year = data ? `As of ${data.date}` : 'No recent records';
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
            // Combine World, Business, and Science news
            return [...(data.World || []), ...(data.Business || []), ...(data.Science || [])].slice(0, 10);
        } catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }

    function createNewsItem(article) {
        const item = document.createElement('article');
        item.classList.add('news-item');
        item.innerHTML = `
            <div class="news-meta">${article.source || 'Global Report'}</div>
            <h3 class="news-title"><a href="${article.link}" target="_blank">${article.title}</a></h3>
            <p class="news-description">${article.title.substring(0, 100)}...</p>
        `;
        return item;
    }

    async function initGazette() {
        // Fetch Stats
        const statPromises = indicators.map(async (indicator) => {
            const data = await fetchIndicatorData(indicator.id);
            return { indicator, data };
        });

        // Fetch News
        const newsPromise = fetchNews();

        const [statResults, newsArticles] = await Promise.all([
            Promise.all(statPromises),
            newsPromise
        ]);

        // Render Stats
        dataGrid.innerHTML = '';
        statResults.forEach(({ indicator, data }) => {
            dataGrid.appendChild(createStatItem(indicator, data));
        });

        // Render News
        newsFeed.innerHTML = '';
        if (newsArticles.length > 0) {
            newsArticles.forEach(article => {
                newsFeed.appendChild(createNewsItem(article));
            });
        } else {
            newsFeed.innerHTML = '<div class="loading-state">News temporarily unavailable. Please check back later.</div>';
        }
    }

    initGazette();
});
