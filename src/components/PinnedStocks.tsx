import React from 'react';
import Card from './Card';
import LineChart from './LineChart';

type PinnedStocksProps = {
    pinnedStocks: Array<String>,
    handleRemoveStock: (selectedStock: String) => void,
}

const PinnedStocks: React.FC<PinnedStocksProps> = ({ pinnedStocks, handleRemoveStock }) => {

    const onRemoveStock = (selectedStock: String) => {
        handleRemoveStock(selectedStock);
    };

    const CardBuilder = () => {
        let cardItems = [];

        for (let i = 0; i < 3; i++) {
            if (pinnedStocks[i] !== undefined) {
                cardItems.push(
                    <Card 
                        pinnedStock={pinnedStocks[i]}
                        removeStock={onRemoveStock}
                        key={i}
                        index={i}
                    />
                )
            } else {
                cardItems.push(
                    <div 
                        className="
                            p-3 
                            m-3 
                            rounded 
                            shadow-sm 
                            border" 
                        style={{
                            flex: '1 1 0',
                            minHeight: '300px',
                        }} 
                        key={i}
                    >
                        <p className="p-5">
                            Pick an additional stock symbol in the search box above to display stock information
                        </p>
                    </div>
                );
            };
        };

        return (
            <div className="container-fluid mx-0 px-0">
                <div className="row">
                        {cardItems}
                </div>
            </div>
        );
    };

    return (
        <div >
            <h1 
                className="
                    px-5 
                    p-3 
                    rounded-right 
                    bg-secondary 
                    text-white 
                    shadow-sm"
                style={{
                    width: '350px', 
                }}
            >
                Pinned Stocks
            </h1>
            <div className="px-5 pt-4 pb-5">
                <CardBuilder />
            </div>
            {pinnedStocks && (
                <LineChart pinnedStocks={pinnedStocks} />
            )}
            </div>
    );
};

export default PinnedStocks;