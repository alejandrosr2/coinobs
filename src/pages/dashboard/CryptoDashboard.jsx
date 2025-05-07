import { useEffect, useState } from 'react';
import { fetchCryptoData } from '../../services/coinApi.js';
import "./CryptoDashboard.css";
import { useSortData } from '../../hooks/useSortData.jsx';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { FiHeart, FiStar } from 'react-icons/fi';
import PortfolioForm from './PortfolioForm.jsx';
import CoinScroll from './CoinScroll.jsx';
import { useSearch } from '../../hooks/useSearch.jsx';
import { Link } from 'react-router-dom';
import { usePortfolioWatchlist } from '../../hooks/usePortfolioWatchlist.jsx';


const CryptoDashboard = () => {
    const [cryptoData, setCryptoData] = useState([]);
    const { sortedData, handleSort, sortColumn, sortOrder } = useSortData(cryptoData);
    const [showModal, setShowModal] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const { searchTerm } = useSearch();
    const { watchList, toggleWatchList, notifications, portfolio, addToPortfolio } = usePortfolioWatchlist()

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchCryptoData();
                setCryptoData(data);
            } catch (error) {
                console.error(error);
                alert("Error al cargar los datos. Intente más tarde.");
            }
        };
        getData();
    }, []);
    
    const renderSortIcon = (column) => {
        return (
            <span style={{ display: "inline-block", width: "20px" }}>
                {sortColumn === column && (sortOrder === "asc" ? <GoTriangleUp /> : <GoTriangleDown />)}
            </span>
        );
    };

    const filteredData = sortedData.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm) ||
        coin.symbol.toLowerCase().includes(searchTerm)
    );

    const handleFormSubmit = (formData) => {
        if (selectedCoin) {
            addToPortfolio(selectedCoin, formData);
            setShowModal(false);
            setSelectedCoin(null);
        }
    };

    return (
        <div>
            {/* Mostrar las notificaciones*/}
            <div className="fixed bottom-4 right-4 space-y-2 z-50">
                {notifications.map((notif) => (
                    <div
                        key={notif.id}
                        className="bg-indigo-600 text-white p-4 rounded-lg shadow-md transition-opacity duration-300 ease-in-out opacity-100 translate-y-0"
                    >
                        {notif.message}
                    </div>
                ))}
            </div>
            {/* Scroll infinito */}
            <CoinScroll/>
            {/* Tabla para mostrar los datos*/}
            <h1 className="pb-4 pt-10">TOP 100</h1>
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-300/20">
                        <th></th>
                        <th className="hover:cursor-pointer" onClick={() => handleSort(cryptoData, "rank")}>
                            # {renderSortIcon("rank")}
                        </th>
                        <th className="text-left pl-4 hover:cursor-pointer" onClick={() => handleSort(cryptoData, "name")}>
                            Coin{renderSortIcon("name")}
                        </th>
                        <th className="hover:cursor-pointer" onClick={() => handleSort(cryptoData, "currentPrice")}>
                            Precio Actual{renderSortIcon("currentPrice")}
                        </th>
                        <th className="hidden sm:table-cell hover:cursor-pointer" onClick={() => handleSort(cryptoData, "priceChange1h")}>
                            Cambio 1h{renderSortIcon("priceChange1h")}
                        </th>
                        <th className="hidden sm:table-cell hover:cursor-pointer" onClick={() => handleSort(cryptoData, "priceChange1d")}>
                            Cambio 24h{renderSortIcon("priceChange1d")}
                        </th>
                        <th className="hidden sm:table-cell hover:cursor-pointer" onClick={() => handleSort(cryptoData, "priceChange7d")}>
                            Cambio 7d{renderSortIcon("priceChange7d")}
                        </th>
                        <th className="hidden lg:table-cell hover:cursor-pointer" onClick={() => handleSort(cryptoData, "volume24h")}>
                            Volumen 24h{renderSortIcon("volume24h")}
                        </th>
                        <th className="hidden lg:table-cell hover:cursor-pointer" onClick={() => handleSort(cryptoData, "marketCap")}>
                            Market Cap{renderSortIcon("marketCap")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((coin, i) => (
                        <tr key={i} className="border-b border-gray-300/20 hover:bg-[rgb(53,53,53)]">
                            <td className="">
                                <div className="flex gap-2">
                                    {/* Corazón - Watchlist */}
                                    <FiHeart 
                                        className={`transition duration-500 hover:drop-shadow-[0_0_5px_hsl(0,100%,50%)] size-3 hover:cursor-pointer ${watchList[coin.rank] ? "fill-red-500 text-red-500 drop-shadow-[0_0_5px_hsl(0,100%,35%)] scale-105" : "text-gray-400"}`}
                                        onClick={() => toggleWatchList(coin.rank, coin.name)} 
                                    />
                                    {/* Estrella - Portfolio */}
                                    <FiStar
                                        className={`transition duration-500 hover:drop-shadow-[0_0_5px_hsl(0,100%,50%)] size-3 hover:cursor-pointer ${portfolio[coin.rank] ? "fill-yellow-500 text-yellow-500 drop-shadow-[0_0_5px_hsl(0,100%,35%)] scale-105" : "text-gray-400"}`}
                                        onClick={() => {
                                            setSelectedCoin({
                                                id: coin.rank,
                                                name: coin.name,
                                                symbol: coin.symbol,
                                                icon: coin.icon,
                                                currentPrice: coin.currentPrice,
                                                priceChange1h: coin.priceChange1h,
                                                priceChange1d: coin.priceChange1d,
                                                priceChange7d: coin.priceChange7d,
                                                volume24h: coin.volume24h,
                                                marketCap: coin.marketCap,
                                            });
                                            setShowModal(true);
                                        }}
                                    />
                                </div>
                            </td>
                            <td>
                                {coin.rank}
                            </td>
                            <td>
                                <Link  className="flex" to={`/coin/${coin.name}`}>
                                    <img src={coin.icon} alt={coin.name} className="size-6 mr-2" />
                                    {coin.name} {coin.symbol}
                                </Link>
                            </td>
                            <td>
                                ${coin.currentPrice?.toLocaleString() || "N/A"}
                            </td>
                            <td className={`${coin.priceChange1h < 0 ? "text-red-500" : "text-green-500"} hidden sm:table-cell`}>
                                {coin.priceChange1h?.toFixed(2) || "N/A"}%
                            </td>
                            <td className={`${coin.priceChange1d < 0 ? "text-red-500" : "text-green-500"} hidden sm:table-cell`}>
                                {coin.priceChange1d?.toFixed(2) || "N/A"}%
                            </td>
                            <td className={`${coin.priceChange7d < 0 ? "text-red-500" : "text-green-500"} hidden sm:table-cell`}>
                                {coin.priceChange7d?.toFixed(2) || "N/A"}%
                            </td>
                            <td className="hidden lg:table-cell">
                                ${coin.volume24h?.toLocaleString() || "N/A"}
                            </td>
                            <td className="hidden lg:table-cell">
                                ${coin.marketCap?.toLocaleString() || "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Formulario para añadir al portfolio */}
            {showModal && (
                <PortfolioForm
                    selectedCoin={selectedCoin}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleFormSubmit}
                />
            )}
        </div>
    );
};

export default CryptoDashboard;
