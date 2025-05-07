import { useEffect, useState } from 'react';

export const useSortData = (data) => {
    const [sortedData, setSortedData] = useState([...data]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const handleSort = (data, column) => {
        let newOrder = "asc";
        if (sortColumn === column && sortOrder === "asc") {
            newOrder = "desc";
        }
    
        const sorted = [...data].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];
    
            if (aValue === undefined || aValue === null) return 1;
            if (bValue === undefined || bValue === null) return -1;
    
            if (typeof aValue === "string") {
            return newOrder === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }
    
            return newOrder === "asc" ? aValue - bValue : bValue - aValue;
        });
    
        setSortOrder(newOrder); 
        setSortColumn(column);
        setSortedData(sorted);  
        };
    
        useEffect(() => {
        setSortedData([...data]);
        }, [data]);
    
        return { sortedData, handleSort, sortColumn, sortOrder };
    };

