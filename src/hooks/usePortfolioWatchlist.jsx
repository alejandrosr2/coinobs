import { useState, useEffect } from "react";

export const usePortfolioWatchlist = () => {
    const [watchList, setWatchList] = useState({});
    const [portfolio, setPortfolio] = useState({});
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const savedWatchList = JSON.parse(localStorage.getItem("watchList")) || {};
        const savedPortfolio = JSON.parse(localStorage.getItem("portfolio")) || {};
        setWatchList(savedWatchList);
        setPortfolio(savedPortfolio);
    }, []);

    const showNotification = (message) => {
        const newNotification = { id: Date.now(), message };

        setNotifications((prevNotifications) => {
            if (prevNotifications.some((notif) => notif.message === message)) {
                return prevNotifications;
            }

            const updatedNotifications = [...prevNotifications, newNotification];
            setTimeout(() => {
                setNotifications((current) =>
                    current.filter((notif) => notif.id !== newNotification.id)
                );
            }, 3000);
            return updatedNotifications;
        });
    };

    const toggleWatchList = (id, name) => {
        setWatchList((prev) => {
            const isRemoving = !!prev[id];
            const updated = { ...prev };

            if (isRemoving) {
                delete updated[id];
                showNotification(`${name} eliminado de la Watchlist`);
            } else {
                updated[id] = name;
                showNotification(`${name} añadido a la Watchlist`);
            }

            localStorage.setItem("watchList", JSON.stringify(updated));
            return updated;
        });
    };

    const addToPortfolio = (coinData, formData) => {
        setPortfolio((prev) => {
            const updated = {
                ...prev,
                [coinData.id]: {
                    ...coinData,
                    holdings: parseFloat(formData.quantity),
                    avgBuyPrice: parseFloat(formData.buyPrice),
                    date: formData.date,
                },
            };

            localStorage.setItem("portfolio", JSON.stringify(updated));
            showNotification(`${coinData.name} añadido/actualizado en el Portfolio`);
            return updated;
        });
    };

    const removeFromPortfolio = (id, name) => {
        setPortfolio((prev) => {
            const updated = { ...prev };
            delete updated[id];
            localStorage.setItem("portfolio", JSON.stringify(updated));
            showNotification(`${name} eliminado del Portfolio`);
            return updated;
        });
    };

    return {
        watchList,
        portfolio,
        notifications,
        toggleWatchList,
        addToPortfolio,
        removeFromPortfolio,
    };
};
