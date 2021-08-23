import React, { useState } from 'react';
import InputDropdown from "./InputDropdown";
import PinnedStocks from './PinnedStocks';


const Dashboard: React.FC = () => {

    const [selectedStocks, setSelectedStocks] = useState<Array<String> | []>([]);

    const handleStockSelect = (e: {target : { innerText: String }}) => {
        const { innerText } = e.target;

        if (selectedStocks.length < 3) {
            setSelectedStocks([...selectedStocks, innerText]);
        }
    };

    const handleRemoveStock = (selectedStock: String) => {
        const selectedStockArr = [...selectedStocks];
        setSelectedStocks(selectedStockArr.filter((stock: String) => stock !== selectedStock));
    };

    return (
        <React.Fragment>
            <div 
                className="container-fluid p-5 text-center"
                style={{
                    backgroundColor: '#0f6273',
                    boxShadow: '0px 0px 6px 0px rgb(49 45 45 / 68%)', 
                }}
            >
                <h1 className="text-white">
                    Stock Comparison App
                </h1>
            </div>
            <InputDropdown
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