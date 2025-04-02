import { useEffect, useState } from 'react';
import { fetchCryptoData } from '../../services/coinApi';
import "./CoinScroll.css";

const CoinScroll = () => {
    const [topGainers, setTopGainers] = useState([]);
    const [topLosers, setTopLosers] = useState([]);

useEffect(() => {
    const getCryptoData = async () => {
        try {
            const data = await fetchCryptoData();
            // Ordenar por cambio porcentual en las últimas 24 horas (de mayor a menor)
            const sortedByChange = [...data].sort(
                (a, b) => b.priceChange1d - a.priceChange1d
            );
            // Obtener las 5 monedas con mayor subida
            const gainers = sortedByChange.slice(0, 5);
            // Obtener las 5 monedas con mayor caída 
            const losers = [...data]
                .filter((coin) => coin.priceChange1d < 0)
                .sort((a, b) => a.priceChange1d - b.priceChange1d) 
                .slice(0, 5);

            setTopGainers(gainers);
            setTopLosers(losers);
        } catch (error) {
            console.error("Error fetching crypto data:", error);
        }
    };

    getCryptoData();
}, []);

    return (
        <div className="flex flex-col space-y-6">
            {/* Lista de ganadores*/}
            <div className="overflow-hidden flex">
                <ul className="flex gap-20 animate-infinite-scroll stop hover:cursor-pointer">
                    {[...topGainers, ...topGainers].map((coin, index) => (
                    <li key={`gainer-${coin.symbol}-${index}`} className="flex gap-2">
                        <span>🔥</span>
                        <img src={coin.icon} alt={coin.name} className="w-6 h-6" />
                        <span className="font-bold whitespace-nowrap">{coin.name}</span>
                        <span className="font-bold mx-1">
                        ${coin.currentPrice.toFixed(2)}
                        </span>
                        <span className="text-green-500">
                        +{coin.priceChange1d.toFixed(2)}%
                        </span>
                    </li>
                    ))}
                </ul>
            </div>

            {/* Lista de perdedores*/}
            <div className="overflow-hidden flex">
                <ul className="flex gap-20 animate-infinite-scroll-left-to-right stop hover:cursor-pointer">
                    {[...topLosers, ...topLosers].map((coin, index) => (
                    <li key={`loser-${coin.symbol}-${index}`} className="flex gap-2">
                        <span>❄️</span>
                        <img src={coin.icon} alt={coin.name} className="w-6 h-6" />
                        <span className="whitespace-nowrap font-bold">{coin.name}</span>
                        <span className="font-bold mx-1">
                        ${coin.currentPrice.toFixed(2)}
                        </span>
                        <span className={`change ${coin.priceChange1d < 0 ? "text-red-600" : "text-green-500"}`}>
                        {coin.priceChange1d.toFixed(2)}%
                        </span>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CoinScroll;
