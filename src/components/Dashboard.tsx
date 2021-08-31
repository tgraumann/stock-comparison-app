import React, { useState } from 'react';
import SearchInput from "./SearchInput";
import PinnedStocks from './PinnedStocks';


const Dashboard: React.FC = () => {

    const [selectedStocks, setSelectedStocks] = useState<Array<String>>([]);

    const handleStockSelect = (e: React.FormEvent<HTMLInputElement>) => {
        const selectedStock = e.target as HTMLElement;
        const { innerText } = selectedStock;

        if (selectedStocks.length < 3) { 
            selectedStocks.includes(innerText) 
            ? alert(`Stock ${innerText} has already been pinned to the Dashboard.`)
            : setSelectedStocks([...selectedStocks, innerText])
        }
    };

    const handleRemoveStock = (selectedStock: String) => {
        setSelectedStocks(selectedStocks.filter((stock: String) => stock !== selectedStock));
    };

    return (
        <React.Fragment>
            <div 
                className="
                    container-fluid 
                    p-5 text-center 
                    bg-secondary 
                    shadow"
            >
                <h1 className="text-white">
                    Stock Comparison App
                </h1>
            </div>
            <SearchInput
                handleStockSelect={handleStockSelect}
            />
            <PinnedStocks 
                pinnedStocks={selectedStocks}
                handleRemoveStock={handleRemoveStock}
            />
        </React.Fragment>
    );
};

export default Dashboard;