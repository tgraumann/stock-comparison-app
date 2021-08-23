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
                        className="p-3 m-3" 
                        style={{
                            flex: '1 1 0',
                            boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 20%)',
                            borderRadius: '20px',
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
                className="px-5 p-3"
                style={{
                    backgroundColor: '#5094a2', 
                    borderRadius: '0 50px 50px 0', 
                    width: '350px', 
                    color: '#ffffff', 
                    boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 20%)',
                }}
            >
                Pinned Stocks
            </h1>
            <div className="px-5 pt-4 pb-5">
                <CardBuilder />
            </div>
            {pinnedStocks && (
                <div style={{width: '100%'}}>
                    <LineChart pinnedStocks={pinnedStocks} />
                </div>
            )}
        </div>
    );
};

export default PinnedStocks;