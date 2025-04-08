import  { useState } from 'react';

const PortfolioForm = ({ selectedCoin, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        quantity: "",
        buyPrice: "",
        date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ quantity: "", buyPrice: "", date: "" });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className=" p-10 rounded bg-bgColor">
                <h2 className="text-lg font-bold mb-4">Agregar {selectedCoin?.name} al Portafolio</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-sm">Cantidad de monedas compradas:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-sm">Precio de Compra:</label>
                        <input
                            type="number"
                            name="buyPrice"
                            value={formData.buyPrice}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm">Fecha:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="border p-1 w-full"
                            required
                        />
                    </div>
                    <div className="flex justify-between gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2">
                            Cancelar
                        </button>
                        <button type="submit" className="px-4 py-2 text-white bg-[#003945] hover:bg-blue/40 transition duration-300 rounded">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PortfolioForm;
