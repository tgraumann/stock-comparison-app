import React from 'react';
import { firstStockResponse, currStockResponse } from '../api/urls';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

type LineChartProps = {
    pinnedStocks: Array<String> | [],
}

type StockDatasetsProps = {
    label: String, 
    data: Array<Number>, 
    backgroundColor: String,
}

type DataProps = {
    labels: Array<String>,
    datasets: Array<StockDatasetsProps>
}

const LineChart: React.FC<LineChartProps> = ({ pinnedStocks }) => {

    const [chartData, setChartData] = useState<DataProps | {}>({});

    useEffect(() =>{

        const fetchData = async () => {
            try {
                // grab keys from first pinned stock to create chart labels from
                let firstStockRes = await firstStockResponse(pinnedStocks);
                let keysArr = Object.keys(firstStockRes.data['Time Series (Daily)']);

                // collect fetched datasets to plug into data object
                let stockDatasets = [];

                for (let stock of pinnedStocks) {

                    // fetching daily stats for current stock
                    let currStockRes = await currStockResponse(stock);
                    let dailyStats = Object.entries(currStockRes.data['Time Series (Daily)']);
                    
                    // loop through closing prices of stock and push them into temp valuesArr 
                    let valuesArr: Array<Number> = [];
                    dailyStats.forEach((value: Array<any>) => {
                        valuesArr.push(Number(value[1]['4. close']));
                    });

                    stockDatasets.push({
                        label: stock, 
                        data: valuesArr, 
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    });
                }

                const data: DataProps = {
                    labels: keysArr,
                    datasets: stockDatasets
                };

                // update chartData
                setChartData(data);

            } catch (err) {
                console.log("Error grabbing chart data: ", err);
            }
        };

        if (pinnedStocks.length) {
            fetchData();
        }
    }, [pinnedStocks]);

    return (
        <div
            style={{
                margin: '0 auto', 
                maxWidth: '75vw'
            }}
        >
            {pinnedStocks.length > 0 && (
                <Line
                    className="px-5 pt-4 pb-5"
                    data={chartData}
                    options={{
                        scales: {
                            y: {
                                ticks: {
                                    callback: function(value: number) {
                                        return '$' + (value).toFixed(2);
                                    }
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
};

export default LineChart;