import { useState, useEffect } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';

const CompareCoins = () => {
    const [cryptoOptions, setCryptoOptions] = useState([]);
    const [selectedCoinA, setSelectedCoinA] = useState(null);
    const [selectedCoinB, setSelectedCoinB] = useState(null);
    const [isOpenA, setIsOpenA] = useState(false);
    const [isOpenB, setIsOpenB] = useState(false);
    const [calculatedPrice, setCalculatedPrice] = useState(null);

    useEffect(() => {
        const CACHE_KEY = "cryptoDataCache";
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            try {
                const parsedData = JSON.parse(cachedData).data;
                setCryptoOptions(parsedData);
            } catch (error) {
                console.error("Error al leer o analizar los datos del caché:", error);
            }
        }
    }, []);

    const toggleDropdownA = () => setIsOpenA(!isOpenA);
    const toggleDropdownB = () => setIsOpenB(!isOpenB);

    const handleSelectA = (coin) => {
        setSelectedCoinA(coin);
        setIsOpenA(false);
        calculatePrice(coin, selectedCoinB);
    };

    const handleSelectB = (coin) => {
        setSelectedCoinB(coin);
        setIsOpenB(false);
        calculatePrice(selectedCoinA, coin);
    };

    const calculatePrice = (coinA, coinB) => {
        if (coinA && coinB) {
            const newPrice = (coinB.marketCap / coinA.marketCap) * coinA.currentPrice;
            setCalculatedPrice(newPrice);
        }
    };

    // Función para intercambiar las monedas 
    const swapCoins = () => {
        setSelectedCoinA(selectedCoinB);
        setSelectedCoinB(selectedCoinA);
        calculatePrice(selectedCoinB, selectedCoinA);
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-4 pt-10">
            <div className="text-center text-2xl">
                <p>Calcula el precio que podría tener la moneda A</p>
                <p>con el <span className="text-blue font-bold mx-2">market cap</span> de la moneda B</p>
            </div>
            <div className="flex lg:w-[45%] justify-between items-center pt-10 gap-6">
                {/* Select A */}
                <div className="flex-1 flex flex-col items-center">
                    <label htmlFor="selectA" className="mb-2 text-center">Select A</label>
                    <div className="relative w-full min-w-40">
                        <button 
                            onClick={toggleDropdownA}
                            className="p-3 border border-gray-300/20 rounded-md w-full flex items-center justify-start space-x-2"
                        >
                            {selectedCoinA ? (
                                <>
                                    <img src={selectedCoinA.icon} alt={selectedCoinA.name} className="w-8 h-8" />
                                    <span>{selectedCoinA.symbol.toUpperCase()}</span>
                                </>
                            ) : (
                                <span>Seleccionar Moneda A</span>
                            )}
                        </button>
                        {isOpenA && (
                            <ul className="absolute top-full left-0 right-0 border border-gray-300/20 rounded-md mt-1 max-h-60 overflow-y-auto z-10 bg-[#242424]">
                                {cryptoOptions.map((coin) => (
                                    <li
                                        key={coin.name}
                                        className="flex items-center p-2 cursor-pointer hover:bg-[rgb(53,53,53)]"
                                        onClick={() => handleSelectA(coin)}
                                    >
                                        <img src={coin.icon} alt={coin.name} className="w-8 h-8 mr-3" />
                                        <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>                
                {/* Icono en el centro con la funcionalidad de intercambio */}
                <div className="item-center mt-8">
                    <FaExchangeAlt onClick={swapCoins} className="cursor-pointer" />
                </div>               
                {/* Select B */}
                <div className="flex-1 flex flex-col items-center">
                    <label htmlFor="selectB" className="mb-2">Select B</label>
                    <div className="relative w-full min-w-40">
                        <button 
                            onClick={toggleDropdownB}
                            className="p-3 border border-gray-300/20 rounded-md w-full flex items-center justify-start space-x-2"
                        >
                            {selectedCoinB ? (
                                <>
                                    <img src={selectedCoinB.icon} alt={selectedCoinB.name} className="w-8 h-8" />
                                    <span>{selectedCoinB.symbol.toUpperCase()}</span>
                                </>
                            ) : (
                                <span>Seleccionar Moneda B</span>
                            )}
                        </button>
                        {isOpenB && (
                            <ul className="absolute top-full left-0 right-0 border border-gray-300/20 rounded-md mt-1 max-h-60 overflow-y-auto z-40 bg-[#242424]">
                                {cryptoOptions.map((coin) => (
                                    <li
                                        key={coin.name}
                                        className="flex items-center p-2 cursor-pointer hover:bg-[rgb(53,53,53)]"
                                        onClick={() => handleSelectB(coin)}
                                    >
                                        <img src={coin.icon} alt={coin.name} className="w-8 h-8 mr-3" />
                                        <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            {/* Mostrar la comparación*/}
            <div className="pt-10">
                {selectedCoinA && selectedCoinB && (
                    <div className="p-2 lg:p-4 border border-gray-300/20 rounded-md">
                        <p className="text-center text-sm pb-6">Precio de {selectedCoinA.symbol.toUpperCase()} con el market cap de {selectedCoinB.symbol.toUpperCase()}</p>
                        <div className="flex justify-center items-center gap-2 font-bold text-xl pb-6">
                            <img src={selectedCoinA.icon} alt={selectedCoinA.name} className="w-8 h-8" />
                            <span>{calculatedPrice ? Number(calculatedPrice.toFixed(2)).toLocaleString() : "Calculando..."}</span>
                            <span className={`${(selectedCoinB.marketCap / selectedCoinA.marketCap) < 1 ? "text-red-500" : "text-green-500"}`} >
                                ({(selectedCoinB.marketCap / selectedCoinA.marketCap).toFixed(2)}x)
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 min-w-[400px] py-2">
                            <p><span className="text-blue font-semibold">{selectedCoinA.symbol.toUpperCase()}</span> market cap</p>
                            <p>{selectedCoinA.marketCap.toLocaleString()}$</p>
                        </div>
                        <div className="flex justify-between border-b border-gray-50 py-2">
                            <p><span className="text-[hsl(190,100%,45%)] font-semibold">{selectedCoinB.symbol.toUpperCase()}</span> market cap</p>
                            <p>{selectedCoinB.marketCap.toLocaleString()}$</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareCoins;
