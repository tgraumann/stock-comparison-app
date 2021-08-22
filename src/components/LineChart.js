import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ pinnedStocks }) => {

    const [chartData, setChartData] = useState({ labels: [], datasets: [] });

    useEffect(() =>{
        const fetchData = async () => {
            try {
                // grab keys from first pinned stock to create chart labels from
                let firstStockRes = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=TIME_SERIES_DAILY&symbol=${pinnedStocks[0]}&apikey=${process.env.REACT_APP_API_KEY4}`);
                let keysArr = Object.keys(firstStockRes.data['Time Series (Daily)']);

                // collect fetched datasets to plug into data object
                let stockDatasets = [];

                for (let stock of pinnedStocks) {
                    // fetching daily stats for current stock
                    let currStockRes = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.REACT_APP_API_KEY7}`);
                    let dailyStats = Object.entries(currStockRes.data['Time Series (Daily)']);
                    
                    // loop through closing prices of stock and push them into temp valuesArr 
                    let valuesArr = [];
                    dailyStats.forEach(value => {
                        valuesArr.push(Number(value[1]['4. close']));
                    });

                    stockDatasets.push({
                        label: stock, 
                        data: valuesArr, 
                        backgroundColor: ['rgba(255, 99, 132, 0.6)',],
                    });
                }

                const data = {
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
        <React.Fragment>
            {pinnedStocks.length > 0 && (
                <Line
                    className="px-5 pt-4 pb-5"
                    data={chartData}
                    options={{
                        scales: {
                            y: {
                                ticks: {
                                    callback: function(value) {
                                        return '$' + value;
                                    }
                                },
                            },
                        },
                    }}
                />
            )}
        </React.Fragment>
    );
};

export default LineChart;