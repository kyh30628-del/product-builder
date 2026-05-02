document.addEventListener('DOMContentLoaded', () => {
    const dataGrid = document.getElementById('data-grid');
    const themeBtn = document.getElementById('theme-btn');
    const body = document.body;

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
        { id: 'SP.POP.TOTL', title: 'Global Population', description: 'Total world population based on the latest census and surveys.', type: 'number' },
        { id: 'NY.GDP.MKTP.KD.ZG', title: 'GDP Growth', description: 'Annual percentage growth rate of GDP at market prices.', type: 'percent' },
        { id: 'SP.DYN.LE00.IN', title: 'Life Expectancy', description: 'Average number of years a newborn is expected to live.', type: 'years' },
        { id: 'SI.POV.DDAY', title: 'Poverty Rate', description: 'Percentage of population living on less than $2.15 a day.', type: 'percent' },
        { id: 'EN.ATM.CO2E.PC', title: 'CO2 Emissions', description: 'Metric tons of carbon dioxide per capita.', type: 'decimal' },
        { id: 'SE.ADT.LITR.ZS', title: 'Literacy Rate', description: 'Percentage of people aged 15 and above who can read and write.', type: 'percent' }
    ];

    async function fetchIndicatorData(indicatorId) {
        try {
            // Fetching global data (region: WLD) for the latest available year
            const response = await fetch(`https://api.worldbank.org/v2/country/1W/indicator/${indicatorId}?format=json&per_page=1`);
            const data = await response.json();
            
            if (data && data[1] && data[1][0]) {
                return data[1][0];
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
                if (numValue >= 1000000000) return (numValue / 1000000000).toFixed(2) + ' Billion';
                if (numValue >= 1000000) return (numValue / 1000000).toFixed(2) + ' Million';
                return numValue.toLocaleString();
            case 'percent':
                return numValue.toFixed(2) + '%';
            case 'years':
                return numValue.toFixed(1) + ' Years';
            case 'decimal':
                return numValue.toFixed(2);
            default:
                return numValue.toString();
        }
    }

    function createCard(indicator, data) {
        const card = document.createElement('div');
        card.classList.add('card');
        
        const value = data ? formatValue(data.value, indicator.type) : 'Data Unavailable';
        const year = data ? `Latest Data: ${data.date}` : '';
        
        card.innerHTML = `
            <div class="card-title">${indicator.title}</div>
            <div class="card-value">${value}</div>
            <div class="card-year">${year}</div>
            <div class="card-description">${indicator.description}</div>
        `;
        
        return card;
    }

    async function initDashboard() {
        dataGrid.innerHTML = '<div class="loading-state">Fetching global records from World Bank...</div>';
        
        const fetchPromises = indicators.map(async (indicator) => {
            const data = await fetchIndicatorData(indicator.id);
            return { indicator, data };
        });

        const results = await Promise.all(fetchPromises);
        
        dataGrid.innerHTML = '';
        results.forEach(({ indicator, data }) => {
            const card = createCard(indicator, data);
            dataGrid.appendChild(card);
        });
    }

    initDashboard();
});
