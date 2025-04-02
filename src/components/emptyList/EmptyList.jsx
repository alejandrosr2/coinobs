import { useEffect, useState } from "react";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";


const EmptyList = ({fotobg, textH2, textP}) => {
    const [cryptos, setCryptos] = useState([]); 
    const [showDropdown, setShowDropdown] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const cryptoData = localStorage.getItem("cryptoDataCache"); 
        if (cryptoData) {
        try {
            const parsedData = JSON.parse(cryptoData);
            if (parsedData && Array.isArray(parsedData.data)) {
            setCryptos(parsedData.data);
            } else {
            console.warn("La propiedad 'data' no es un array:", parsedData);
            }
        } catch (error) {
            console.error("Error al parsear los datos de localStorage:", error);
        }
        }
    }, []);
    
    //Cambia el estado de visibilidad del dropdown
    const handleDropdownToggle = () => {
        setShowDropdown((prev) => !prev); 
    };

    const handleSelectCrypto = (name) => {
        navigate(`/coin/${name}`); //Navega a la página de la criptomoneda seleccionada
        setShowDropdown(false); //Cierra el dropdown después de la selección
    };

    return (
        <div>
            <div className="flex justify-center flex-col min-h-[60vh] items-center text-xl">
                <img src={fotobg} alt="Watchlist Background" className="size-80" />
                <h2 className="text-2xl">{textH2}</h2>
                <p className="pb-6 text-lg">{textP}</p>
            <Button
                text="+ Añade una moneda"
                bgColor="red-500"
            onClick={handleDropdownToggle} 
            />
            {/* Dropdown de criptomonedas */}
            {showDropdown && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">  
                    <div className="absolute mt-24 bg-bgColor rounded-lg border">
                        <ul className="max-h-[500px] overflow-y-auto">
                        {cryptos.map((crypto) => (
                            <li
                                key={crypto.name}
                                className="p-2 cursor-pointer border border-gray-300/20 "
                                onClick={() => handleSelectCrypto(crypto.name)}
                            >
                                <div className="flex gap-2">
                                    <img src={crypto.icon} alt="" className="size-6" />
                                    <span>{crypto.name}</span>    
                                </div>
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )}
            </div>
            </div>
    );
};

export default EmptyList
