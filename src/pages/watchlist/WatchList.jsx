import { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import fotobg from "../../assets/fotowatchlist.png";
import EmptyList from '../../components/emptyList/EmptyList';

const WatchList = () => {
    const [cryptoData, setCryptoData] = useState([]); 
    const [tooltipVisible, setTooltipVisible] = useState({});

    useEffect(() => {       
        const savedWatchList = JSON.parse(localStorage.getItem('watchList')) || {};
        
        const cleanedWatchList = Object.keys(savedWatchList)
            .filter((key) => savedWatchList[key] !== null && savedWatchList[key] !== "")
            .reduce((obj, key) => {
                obj[key] = savedWatchList[key];
                return obj;
            }, {});

        localStorage.setItem('watchList', JSON.stringify(cleanedWatchList));

        const watchListIds = Object.keys(cleanedWatchList); 
        const storedCryptoData = JSON.parse(localStorage.getItem('cryptoDataCache'));

        if (storedCryptoData) {
            const filteredData = storedCryptoData.data.filter(coin => watchListIds.includes(coin.rank.toString()));
            setCryptoData(filteredData);
        }
    }, []);

    const removeFromWatchList = (id) => {
        const updatedWatchList = JSON.parse(localStorage.getItem('watchList')) || {};
        
        delete updatedWatchList[id];
        
        localStorage.setItem('watchList', JSON.stringify(updatedWatchList));

        setCryptoData((prevCryptoData) => prevCryptoData.filter(coin => coin.rank.toString() !== id));
    };

    const handleMouseEnter = (rank) => {
        setTooltipVisible((prev) => ({ ...prev, [rank]: true }));
    };

    const handleMouseLeave = (rank) => {
        setTooltipVisible((prev) => ({ ...prev, [rank]: false }));
    };

    const savedWatchList = JSON.parse(localStorage.getItem('watchList')) || {};
    const watchListIds = Object.keys(savedWatchList);

    if (watchListIds.length < 1) {
        return <EmptyList 
            fotobg={fotobg}
            textH2="¿Quieres seguir los movimientos de alguna moneda?"
            textP="Añádelas y ahora y estarás al tanto de toda su evolución."
        />;
    }

    return (
        <div className="pt-10">
            <h1 className="text-2xl font-bold mb-4">Watchlist</h1>           
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-300/20">
                            <th className="w-8">#</th>
                            <th className="text-left pl-4">Coin</th>
                            <th className="text-right pr-4">Precio Actual</th>
                            <th className="text-right pr-4">Cambio 24h</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptoData.map((coin) => (
                            <tr key={coin.rank} className="border-b border-gray-300/20 hover:bg-[rgb(53,53,53)]">
                                <td className="w-8">
                                    <div className="relative flex items-center justify-center">
                                        <button 
                                            onClick={() => removeFromWatchList(coin.rank.toString())}
                                            onMouseEnter={() => handleMouseEnter(coin.rank)}
                                            onMouseLeave={() => handleMouseLeave(coin.rank)}
                                            className="relative"
                                        >
                                            <FiHeart className="text-red-500 fill-current hover:drop-shadow-[0_0_5px_hsl(0,100%,50%)] size-3 duration-300" />
                                            {tooltipVisible[coin.rank] && (
                                                <span className="border border-gray-300/20 absolute left-1/2 transform -translate-x-1/2 translate-y-2 text-white text-sm px-2 py-1 rounded opacity-100 transition-opacity duration-200 bg-[#242424] z-40">
                                                    Eliminar de tu lista de seguimiento
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </td>
                                <td className="flex items-center gap-2 pl-4">
                                    <img src={coin.icon} alt={coin.name} style={{ width: '24px' }} />
                                    <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                                </td>
                                <td className="text-right pr-4">${coin.currentPrice?.toLocaleString() || 'N/A'}</td>
                                <td className={`text-right pr-4 ${coin.priceChange1d < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {coin.priceChange1d?.toFixed(2) || 'N/A'}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            
        </div>
    );
};

export default WatchList;
