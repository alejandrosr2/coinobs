export const fetchCryptoData = async () => {
    const CACHE_KEY = 'cryptoDataCache';
    const CACHE_EXPIRY = 5 * 60 * 1000; 
    const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d';

    const getCachedData = () => {
        try {
            const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
            if (cachedData) {
                const { timestamp, data } = cachedData;
                const now = Date.now();
                
                if (now - timestamp < CACHE_EXPIRY) {
                    return data;
                }
            }
        } catch (error) {
            console.warn("Error leyendo datos de caché:", error);
        }
        return null; 
    };

    const cacheData = (data) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    };

    const cachedData = getCachedData();
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
        }

        const data = await response.json();

        const processedData = data.map(coin => ({
            rank: coin.market_cap_rank,
            name: coin.name,
            symbol: coin.symbol,
            icon: coin.image,
            currentPrice: coin.current_price,
            priceChange1h: coin.price_change_percentage_1h_in_currency,
            priceChange1d: coin.price_change_percentage_24h,
            priceChange7d: coin.price_change_percentage_7d_in_currency,
            volume24h: coin.total_volume,
            marketCap: coin.market_cap,
            marketCapChange: coin.market_cap_change_percentage_24h,
            maxSupply: coin.max_supply,
        }));

        cacheData(processedData);

        return processedData;
    } catch (error) {
        console.error("Hubo un problema al obtener los datos de la API:", error);

        if (cachedData) {
            return cachedData;
        }

        throw new Error("No se pudieron obtener los datos de la API ni usar los datos en caché");
    }
};
