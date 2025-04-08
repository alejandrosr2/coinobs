import { useEffect, useState } from "react";
import "./style.css";
import Card from "../../components/card/Card";

const data = [
    { label: "Capital Base", type: "text", name: "initialCapital" },
    { label: "Asset", type: "text", name: "asset" },
    { label: "Pérdida máxima asumible %", type: "number", name: "maxLost" },
    { label: "Precio Entrada", type: "number", name: "entryPrice" },
    { label: "StopLoss", type: "number", name: "stoploss" },
];

const PositionCalculator = () => {
    const [formValues, setFormValues] = useState({
        initialCapital: "1000",
        asset: "BTC",
        maxLost: "1",
        entryPrice: "100",
        stoploss: "110",
    });

    const [results, setResults] = useState({ positionSize: "", positionValue: "", maxLostUnit: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        const { initialCapital, maxLost, entryPrice, stoploss } = formValues;
        if (initialCapital && maxLost && entryPrice && stoploss) {
            const riskPerUnit = Math.abs(entryPrice - stoploss);
            const maxRisk = (initialCapital * (maxLost / 100));

            const positionSize = maxRisk / riskPerUnit;
            const positionValue = positionSize * entryPrice;
            const maxLostUnit = initialCapital * (maxLost / 100);
            setResults({
                positionSize,
                positionValue,
                maxLostUnit: maxLostUnit.toFixed(2)
            });
        } else {
            setResults({ positionSize: "", positionValue: "" });
        }
    }, [formValues]);

    return (
        <div className="pt-10">
            <h1 className="text-2xl font-bold mb-4">Calculadora de posición</h1>
            {/* Inputs información sobre la operación */}
            <div className="grid lg:grid-cols-5 gap-2 ">
                {data.map((data, i) => (
                    <div key={i} className="inputs">
                        <label className="mb-2">{data.label}</label>
                        <input
                            className="bg-bgColor border border-gray-300/20 focus:ring-0 focus:outline-none focus:border focus:border-gray-300/50 p-1 rounded-md w-full flex items-center justify-start space-x-2"
                            type={data.type}
                            name={data.name}
                            value={formValues[data.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            {/* Sección para mostrar los resultados */}
            <div className="flex justify-center pt-20">
                <div className="grid grid-cols-3 gap-5">
                    <Card
                        title="Pérdida máxima"
                        mainValue={results.maxLostUnit ? `${results.maxLostUnit} $` : ""}
                    />
                    <Card
                        title={formValues.asset ? `Posición en ${formValues.asset}` : "Posición en Cripto"}
                        mainValue={results.positionSize}
                    />
                    <Card
                        title="Posición en $"
                        mainValue={results.positionValue ? `${results.positionValue}$` : ""}
                    />
                </div>
            </div>
        </div>
    );
};

export default PositionCalculator;
