import { useEffect, useState } from 'react';
import { FiStar, FiEdit2 } from 'react-icons/fi'; 
import PortfolioStats from './PortfolioStats';
import EmptyList from '../../components/emptyList/EmptyList';
import fotobg from "../../assets/fotobg.png"

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState({});
    const [tooltipVisible, setTooltipVisible] = useState({}); 
    const [portfolioName, setPortfolioName] = useState("Mi Portafolio");
    const [isEditing, setIsEditing] = useState(false);
    
    
    useEffect(() => {
        // Cargar los datos del localStorage
        const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
        setPortfolio(savedPortfolio);

        // Cargar el nombre guardado
        const savedName = localStorage.getItem("portfolioName");
        if (savedName) {
            setPortfolioName(savedName);
        }
    }, []);

    // Función para manejar el cambio de nombre
    const handleNameChange = (e) => {
        setPortfolioName(e.target.value);
    };

    // Función para guardar el nombre
    const handleNameSave = () => {
        setIsEditing(false);
        localStorage.setItem("portfolioName", portfolioName); 
    };

    // Función para eliminar del portafolio
    const removeFromPortfolio = (id) => {
        const updatedPortfolio = { ...portfolio };
        delete updatedPortfolio[id]; 

        localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
        setPortfolio(updatedPortfolio);
    };

    // Mostrar tooltip cuando el mouse entra
    const handleMouseEnter = (id) => {
        setTooltipVisible((prev) => ({ ...prev, [id]: true }));
    };

    // Ocultar tooltip cuando el mouse sale
    const handleMouseLeave = (id) => {
        setTooltipVisible((prev) => ({ ...prev, [id]: false }));
    };

    // Verifica que portfolio tiene datos antes de renderizar,si no los tiene muestra otro componente
    if (Object.keys(portfolio).length === 0) {
        return <EmptyList 
            fotobg={fotobg}
            textH2="¿Quieres llevar un seguimiento de tus monedas?"
            textP="Añádelas y ahora y estarás al tanto de toda su evolución."
            />;
    }

    return (
        <>
            <div className="flex items-center pt-10">
                <button onClick={() => setIsEditing(true)}   className="mr-4">
                    <FiEdit2 className="text-blue hover:text-gray-700 " />
                </button>
                {isEditing ? (
                    <input
                        type="text"
                        value={portfolioName}
                        onChange={handleNameChange}
                        onBlur={handleNameSave}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
                        className="text-2xl font-bold bg-bgColor flex-grow focus:ring-0 focus:outline-none focus:border-b focus:border-b-gray-300/20 h-[2rem] max-w-[25%]"          
                        autoFocus
                    />
                ) : (
                    <h1 className="text-2xl font-bold">{portfolioName}</h1>
                )}
            </div>
            <div className="pt- pb-20">
                <PortfolioStats/>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-300/20">
                            <th className="w-8">#</th>
                            <th className="text-left pl-4">Coin</th>
                            <th className="text-right pr-4">Precio Actual</th>
                            <th className="text-right pr-4">Cambio 24h</th>
                            <th className="text-right pr-4">Cambio 7d</th>
                            <th className="text-right pr-4">Holdings</th>
                            <th className="text-right pr-4">Precio Promedio de Compra</th>
                            <th className="text-right pr-4">Profit/Loss</th>
                            <th className="w-8">+</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(portfolio).map((coin, i) => (
                            <tr key={i} className="border-b border-gray-300/20 hover:bg-[rgb(53,53,53)]">
                                <td className="w-8">
                                    <div className="relative flex items-center justify-center">
                                        <button
                                            onClick={() => removeFromPortfolio(coin.id)}
                                            onMouseEnter={() => handleMouseEnter(coin.id)}
                                            onMouseLeave={() => handleMouseLeave(coin.id)}
                                            className="relative"
                                        >
                                            <FiStar className="text-yellow-500 fill-current hover:drop-shadow-[0_0_5px_hsl(0,100%,50%)] size-3 duration-300" />
                                            {tooltipVisible[coin.id] && (
                                                <span className="border border-gray-300/20 absolute left-1/2 transform -translate-x-1/2 translate-y-2 text-white text-sm px-2 py-1 rounded opacity-100 transition-opacity duration-200 bg-[#242424] z-40">
                                                    Eliminar del portafolio
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </td>
                                <td className="pl-4 align-middle">
                                    <div className="flex items-center gap-2">
                                        <img src={coin.icon} alt={coin.name} className="w-6" />
                                        <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                                    </div>
                                </td>
                                <td className="text-right pr-4">${coin.currentPrice?.toLocaleString() || 'N/A'}</td>
                                <td className={`text-right pr-4 ${coin.priceChange1d < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {coin.priceChange1d?.toFixed(2) || 'N/A'}%
                                </td>
                                <td className={`text-right pr-4 ${coin.priceChange7d < 0 ? "text-red-500" : "text-green-500"}`}>
                                    {coin.priceChange7d?.toFixed(2) || 'N/A'}%
                                </td>
                                <td className="text-right pr-4">
                                    <div className="flex flex-col items-end">
                                        <span>{(coin.holdings * coin.currentPrice).toFixed(2)}$</span>
                                        <span>{coin.holdings} {coin.symbol.toUpperCase()}</span>
                                    </div>
                                </td>
                                <td className="text-right pr-4">{coin.avgBuyPrice?.toLocaleString() || 'N/A'}$</td>
                                <td className={`text-right pr-4 ${((coin.currentPrice - coin.avgBuyPrice) * coin.holdings) > 0 ? "text-green-500" : "text-red-500"}`}>
                                    {((coin.currentPrice - coin.avgBuyPrice) * coin.holdings).toFixed(2)} $
                                </td>
                                <td className="w-8">+</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Portfolio;
