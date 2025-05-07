import { renderHook, act } from '@testing-library/react';
import { useSortData } from '@/hooks/useSortData'; 
import { describe, expect, it } from 'vitest';

const mockData = [
    { rank: 3, name: "Ripple", symbol: "XRP", currentPrice: 1.0, priceChange1h: 0.2 },
    { rank: 1, name: "Bitcoin", symbol: "BTC", currentPrice: 50000, priceChange1h: 1.5 },
    { rank: 2, name: "Ethereum", symbol: "ETH", currentPrice: 3000, priceChange1h: -0.5 }
];

describe("useSortData", () => {
    it("should sort data by rank in ascending order", () => {
        const { result } = renderHook(() => useSortData(mockData));

        expect(result.current.sortedData[0].rank).toBe(3); 
        expect(result.current.sortedData[1].rank).toBe(1); 
        expect(result.current.sortedData[2].rank).toBe(2); 

        act(() => {
            result.current.handleSort(mockData, "rank");
        });

        expect(result.current.sortedData[0].rank).toBe(1); 
        expect(result.current.sortedData[1].rank).toBe(2); 
        expect(result.current.sortedData[2].rank).toBe(3); 
    });

    it("should sort data by name in alphabetical order", () => {
        const { result } = renderHook(() => useSortData(mockData));

        expect(result.current.sortedData[0].name).toBe("Ripple");
        expect(result.current.sortedData[1].name).toBe("Bitcoin");
        expect(result.current.sortedData[2].name).toBe("Ethereum");

        act(() => {
        result.current.handleSort(mockData, "name");
        });

        expect(result.current.sortedData[0].name).toBe("Bitcoin");
        expect(result.current.sortedData[1].name).toBe("Ethereum");
        expect(result.current.sortedData[2].name).toBe("Ripple");
    });

    it("should toggle sort order between ascending and descending", () => {
        const { result } = renderHook(() => useSortData(mockData));

        act(() => {
        result.current.handleSort(mockData, "rank");
        });
        expect(result.current.sortedData[0].rank).toBe(1); 

        act(() => {
        result.current.handleSort(mockData, "rank");
        });
        expect(result.current.sortedData[0].rank).toBe(3); 
    });

    it("should sort data by priceChange1h in ascending order", () => {
        const { result } = renderHook(() => useSortData(mockData));

        expect(result.current.sortedData[0].priceChange1h).toBe(0.2);    
        expect(result.current.sortedData[1].priceChange1h).toBe(1.5);    
        expect(result.current.sortedData[2].priceChange1h).toBe(-0.5);   

        act(() => {
        result.current.handleSort(mockData, "priceChange1h");
        });

        expect(result.current.sortedData[0].priceChange1h).toBe(-0.5); 
        expect(result.current.sortedData[1].priceChange1h).toBe(0.2);  
        expect(result.current.sortedData[2].priceChange1h).toBe(1.5);  
    });
});
