import "./style.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart, FiStar } from "react-icons/fi";
import { usePortfolioWatchlist } from "../../hooks/usePortfolioWatchlist";
import PortfolioForm from "../dashboard/PortfolioForm";

const CoinStats = () => {
    const { name } = useParams(); 
    const [coinData, setCoinData] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const [selectedCoin, setSelectedCoin] = useState(null); 
    const { toggleWatchList, notifications, watchList, portfolio, addToPortfolio } = usePortfolioWatchlist();

    useEffect(() => {
        const cryptoDataCache = JSON.parse(localStorage.getItem("cryptoDataCache")) || [];

        const selectedCoin = cryptoDataCache.data.find(
            (coin) => coin.name.toLowerCase() === name.toLowerCase()
        );

        if (selectedCoin) {
            setCoinData(selectedCoin);
        } else {
            console.error("Moneda no encontrada:", name);
        }
    }, [name]);

    if (!coinData) {
        return <div>Loading...</div>;
    }

    // determinar el color en base al valor
    const getColorClass = (value) => {
        return value >= 0 ? 'text-green-500' : 'text-red-500';
    };

    //Manejar envío del formulario del portafolio
    const handleFormSubmit = (formData) => {
        if (selectedCoin) {
            addToPortfolio(selectedCoin, formData);
            setShowModal(false);
            setSelectedCoin(null);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:min-h-[60vh] pt-10">
            <div className="grid gap-2 order-1 lg:order-none">
                {/* Cap Mercado */}
                <div className="box row-span-2 text-center min-h-[80px]">
                    <div className="flex flex-col justify-center min-h-full hover:scale-105 duration-300">
                        <h2 className="text-2xl font-bold">Capitalización de mercado</h2>
                        <div className="flex gap-4 justify-center">
                            <p>{coinData.marketCap.toLocaleString()}$</p>
                            <p className={`${getColorClass(coinData.marketCapChange)}`}>
                                {coinData.marketCapChange.toLocaleString()}%
                            </p>
                        </div>
                    </div>
                </div>
                {/* Volúmen */}
                <div className="box min-h-[80px]">
                    <div className="flex justify-center items-center min-h-full gap-2">
                        <h2 className="text-lg">Volumen:</h2>
                        <p>{coinData.volume24h.toLocaleString()}$<span className="text-gray-300/50"> (24h)</span></p>
                    </div>
                </div>
                {/* Supply */}
                <div className="box row-span-2 min-h-[80px]">
                    <div className="flex flex-col justify-center items-center min-h-full hover:scale-105 duration-300">
                        <h2 className="text-2xl font-bold">Max supply</h2>
                        <div className="flex gap-4 justify-center">
                            <p>{coinData.maxSupply ? coinData.maxSupply.toLocaleString() : '∞'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-2">
                {/* Precio actual */}
                <div className="box min-h-[80px] order-1 lg:order-none">
                    <div className="flex flex-col justify-center items-center min-h-full gap-2 ">
                        <p className="text-2xl">{coinData.currentPrice.toLocaleString()}$</p>
                        <div className="flex items-center gap-2">
                            <p className={`${getColorClass(coinData.priceChange1d)}`}>+{coinData.priceChange1d.toLocaleString()}%</p>
                            <span className="text-sm text-gray-300/50">(24h)</span>
                        </div>
                    </div>
                </div>
                {/* Nombre de la moneda */}
                <div className="box row-span-2 min-h-[80px] ">
                    <div className="flex justify-center items-center min-h-full gap-2 ">
                        <img src={coinData.icon} alt="" className="size-12" />
                        <h1 className="text-6xl font-bold">{coinData.symbol.toUpperCase()}</h1>
                    </div>
                </div>
            </div>
            <div className="grid gap-2 order-1 lg:order-none">
                {/* Volver al top100 */}
                <div className="box row-span-1 min-h-[80px]">
                    <Link to={"/"}>
                        <p className="flex justify-center items-center min-h-full gap-2 text-2xl hover:text-blue-500">Volver atrás</p>
                    </Link>
                </div>
                {/* Añadir a wachtlist */}
                <div
                    className="box flex items-center justify-center relative hover:cursor-pointer overflow-hidden group min-h-[80px]"
                    onClick={() => toggleWatchList(coinData.rank, coinData.name)}
                >
                    <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-full">
                        {watchList[coinData.rank] ? (
                            <FiHeart className="size-5 lg:size-10 fill-red-500 text-red-500" />
                        ) : (
                            <FiHeart className="size-5 lg:size-10" />
                        )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transform translate-x-full transition-transform duration-300 group-hover:translate-x-0">
                        <span className="text-lg font-semibold">
                            {watchList[coinData.rank] ? "Quitar de la Watchlist" : "Añadir a la Watchlist"}
                        </span>
                    </div>
                </div>
                {/* Añadir a portfolio */}
                <div 
                    className="box flex items-center justify-center relative overflow-hidden group min-h-[80px]"
                    onClick={() => {
                        setSelectedCoin({
                            id: coinData.rank,
                            name: coinData.name,
                            symbol: coinData.symbol,
                            icon: coinData.icon,
                            currentPrice: coinData.currentPrice,
                            priceChange1h: coinData.priceChange1h,
                            priceChange1d: coinData.priceChange1d,
                            priceChange7d: coinData.priceChange7d,
                            volume24h: coinData.volume24h,
                            marketCap: coinData.marketCap,
                        });
                        setShowModal(true);
                    }}
                >
                    <div className="absolute inset-0 flex items-center justify-center transform transition-transform duration-300 group-hover:-translate-x-full">
                        {portfolio[coinData.rank] ? (
                            <FiStar className="size-5 lg:size-10 fill-yellow-500 text-yellow-500" />
                        ) : (
                            <FiStar className="size-5 lg:size-10" />
                        )}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center transform translate-x-full transition-transform duration-300 group-hover:translate-x-0">
                        <span className="text-lg font-semibold">
                            {portfolio[coinData.rank] ? "Actualizar el portfolio" : "Añadir al portfolio"}
                        </span>
                    </div>
                </div>
            </div>
            {/*notificaciones*/}
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
            {/*formulario*/}
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

export default CoinStats;
