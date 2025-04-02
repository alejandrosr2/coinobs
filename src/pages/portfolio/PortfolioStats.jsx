import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

const PortfolioStats = () => {
    const [portfolio, setPortfolio] = useState({});
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [profitDollar, setProfitDollar] = useState(0);
    const [profitPercentage, setProfitPercentage] = useState(0);
    const [bestPerformer, setBestPerformer] = useState(null);
    const [worstPerformer, setWorstPerformer] = useState(null);
    const [portfolioChange24h, setPortfolioChange24h] = useState(0);

    useEffect(() => {
        // Cargar los datos 
        const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
        setPortfolio(savedPortfolio);
        // Calcular el balance inicial 
        const initialBalance = Object.values(savedPortfolio).reduce((total, coin) => {
            return total + (coin.holdings * coin.avgBuyPrice);
        }, 0);
        setInitialInvestment(initialBalance);
        // Calcular las ganancias totales en dólares
        const portfolioValues = Object.values(savedPortfolio).map(coin => {
            const profitForCoin = (coin.currentPrice - coin.avgBuyPrice) * coin.holdings;
            const profitPercentageForCoin = ((coin.currentPrice - coin.avgBuyPrice) / coin.avgBuyPrice) * 100;

            return {
                ...coin,
                profitDollar: profitForCoin,
                profitPercentage: profitPercentageForCoin
            };
        });

        const totalProfitDollar = portfolioValues.reduce((total, coin) => total + coin.profitDollar, 0);
        setProfitDollar(totalProfitDollar);
            // Calcular el cambio en las últimas 24 horas usando el cambio porcentual 
            let totalChange24h = 0;
            portfolioValues.forEach(coin => {
                const priceChange1d = coin.priceChange1d; 
    
                if (priceChange1d) {
                    // Calcular el cambio en dólares basado en el cambio porcentual
                    const changeInDollars = (priceChange1d / 100) * coin.holdings * coin.currentPrice;
                    totalChange24h += changeInDollars;
                }
            });
        
            setPortfolioChange24h(totalChange24h);

        // Calcular el porcentaje de ganancias basado en la inversión inicial
        const profitPercentageValue = initialBalance > 0 ? (totalProfitDollar / initialBalance) * 100 : 0;
        setProfitPercentage(profitPercentageValue);

        // Encuentra la inversión con mejor y peor desmpeño
        if (portfolioValues.length > 0) {
            const best = portfolioValues.reduce((max, coin) => coin.profitPercentage > max.profitPercentage ? coin : max, portfolioValues[0]);
            const worst = portfolioValues.reduce((min, coin) => coin.profitPercentage < min.profitPercentage ? coin : min, portfolioValues[0]);

            setBestPerformer(best);
            setWorstPerformer(worst);
        }
    }, []);

    // Función para determinar el color en base al valor (positivo o negativo)
    const getColorClass = (value) => {
        return value >= 0 ? 'text-green-500' : 'text-red-500';
    };

    return (
        <>
            <div className="pt-2 pb-10">
                <p className="font-bold text-3xl">{initialInvestment + profitDollar}$</p>
                <div className="flex gap-1">
                    <p className={`${getColorClass(portfolioChange24h)}`}>
                        {portfolioChange24h >= 0 ? "+" : "-"}
                        ${portfolioChange24h.toFixed(2)}
                    </p>
                    <p className={`${getColorClass(portfolioChange24h)} flex`}>
                        {portfolioChange24h >= 0 ? (
                            <GoTriangleUp className="text-green-500" />
                        ) : (
                            <GoTriangleDown  className="text-red-500" />
                        )}
                        {((portfolioChange24h / (initialInvestment + profitDollar)) * 100).toFixed(2)}%
                        (24h)
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-28 gap-2">
                <Card
                    title="Balance inicial"
                    mainValue={`$${initialInvestment.toFixed(2)}`}
                />
                <Card
                    title="All-time Profits"
                    mainValue={
                        <span className={getColorClass(profitDollar)}>${profitDollar.toFixed(2)}</span>
                    }
                    subValue1={
                        <span className={getColorClass(profitPercentage)}>{profitPercentage.toFixed(2)}%</span>
                    }
                />
                {bestPerformer && (
                    <Card
                        title="Best Performer"
                        mainValue={
                            <div className="flex items-center justify-center">
                                <img src={bestPerformer.icon} alt={bestPerformer.symbol} className="w-6 h-6" />
                                <span>{bestPerformer.symbol.toUpperCase()}</span>
                            </div>
                        }
                        subValue1={
                            <span className={getColorClass(bestPerformer.profitDollar)}>
                                ${bestPerformer.profitDollar.toFixed(2)} {bestPerformer.profitPercentage.toFixed(2)}%
                            </span>
                        }
                    />
                )}
                {worstPerformer && (
                    <Card
                        title="Worst Performer"
                        mainValue={
                            <div className="flex items-center justify-center">
                                <img src={worstPerformer.icon} alt={worstPerformer.symbol} className="w-6 h-6" />
                                <span>{worstPerformer.symbol.toUpperCase()}</span>
                            </div>
                        }
                        subValue1={
                            <span className={getColorClass(worstPerformer.profitDollar)}>
                                ${worstPerformer.profitDollar.toFixed(2)} {worstPerformer.profitPercentage.toFixed(2)}%
                            </span>
                        }
                    />
                )}
            </div>
        </>
    );
};

export default PortfolioStats;
