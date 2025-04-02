
const Card = ({ title, mainValue, subValue1, subValue2, icon, titleClass, mainValueClass, subValue1Class, subValue2Class, iconClass }) => {
    return (
        <div className="border border-gray-300/20 rounded-lg shadow p-4 text-center bg-[#2c2c2c] hover:scale-105 duration-300">
            <h2 className={`text-lg font-bold text-blue ${titleClass}`}>{title}</h2>
            <div className={`text-xl font-semibold ${mainValueClass}`}>{mainValue}</div>
            {subValue1 !== undefined && (
                <div className={` mb-2 ${subValue1Class}`}>{subValue1}</div>
            )}
            {subValue2 !== undefined && (
                <div className={` ${subValue2Class}`}>{subValue2}</div>
            )}
            {icon && (
                <div className={`flex items-center ${iconClass}`}>
                    <img src={icon} alt="Icono" className="w-6 h-6 mr-2" />
                    <span>{subValue1}</span>
                </div>
            )}
        </div>
    );
}

export default Card;
