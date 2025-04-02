import { useEffect, useState } from 'react';

export const useSortData = (initialData = []) => {
    const [sortedData, setSortedData] = useState(initialData);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        setSortedData(initialData); 
    }, [initialData]);

    const sortData = (data, column) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        const sorted = [...data].sort((a, b) => {
            if (column === 'name') {
                return a.name.localeCompare(b.name) * order;
            }
            if (column === '#') {
                return (data.indexOf(a) - data.indexOf(b)) * order; 
            }
            return (a[column] - b[column]) * order;
        });
        setSortedData(sorted);
    };

    const handleSort = (data, column) => {
        const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        setSortColumn(column);
        sortData(data, column);
    };

    return {
        sortedData,
        sortColumn,
        sortOrder,
        handleSort
    };
};
