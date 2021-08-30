import React from 'react';
import { useEffect, useState } from 'react';
import { overviewResponse, globalQuoteResponse } from '../api/urls';

type CardProps = {
    pinnedStock: String,
    removeStock: (stock: String) => void,
    index: Number,
}

const Card: React.FC<CardProps> = ({ pinnedStock, removeStock, index}) => {

    const [name, setName] = useState<String>('');
    const [currency, setCurrency] = useState<String>('');
    const [price, setPrice] = useState<Number>();
    const [changePercentStat, setChangePercentStat] = useState<String>('');
    const [highStat, setHighStat] = useState<Number>();
    const [lowStat, setLowStat] = useState<Number>();
    
    const handleClick = (stock: String) => {
        removeStock(stock);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                let overviewRes = await overviewResponse(pinnedStock);
                setCurrency(overviewRes.data["Currency"]);
                
                let globalQuoteRes = await globalQuoteResponse(pinnedStock);
                setPrice(Number(globalQuoteRes.data["Global Quote"]["05. price"]));
                setName(overviewRes.data["Name"]);
                setChangePercentStat(globalQuoteRes.data["Global Quote"]["10. change percent"]);
                setHighStat(Number(globalQuoteRes.data["Global Quote"]["03. high"]));
                setLowStat(Number(globalQuoteRes.data["Global Quote"]["04. low"]));

            } catch (err) {
                console.log("Error fetching stock data: ", err);
            }
        };
        fetchData();

    }, [pinnedStock]);

    return (
        <div 
            style={{
                flex: '1 1 0',
            }} 
            className="
                p-3 
                m-3 
                rounded 
                shadow-sm 
                border"
        >
            <div className="d-flex justify-content-between">
                <div>
                    <h3 className="pt-2">
                        {pinnedStock}
                    </h3>
                    {name
                        ? <p>{name}</p>
                        : <p className="text-secondary">Name unavailable...</p>
                    }
                   
                </div>
                <span 
                    className="
                        rounded-circle 
                        bg-danger 
                        shadow-sm 
                        text-white 
                        text-center 
                        font-weight-light"
                    style={{
                        height: '30px',
                        width: '30px',
                        padding: '1px',
                    }} 
                    onClick={() => handleClick(pinnedStock)}
                >
                    x
                </span>
            </div>
            {price && changePercentStat ? (
                <div className="d-flex"> 
                    <div className="fs-1">
                        {(changePercentStat[0] === '-') 
                            ? <div className="bi bi-arrow-down text-danger text-center"></div>
                            : <div className="bi bi-arrow-up text-success text-center"></div>
                        }
                    </div>
                    <div>
                        <h4>{currency !== '' ? currency : 'USD'} {(price).toFixed(2)}</h4>
                        <p>{changePercentStat}</p>
                    </div>
                </div>
            ) : (
                <p className="text-secondary">
                    Stock data currently unavailable...
                </p>
            )}
            <React.Fragment>
                <h5>Stats:</h5>
                <table>
                    <tbody>
                        <tr>
                            <th>High:</th>
                            {highStat
                                ? <td>{(highStat).toFixed(2)}</td>
                                : <td className="text-secondary">...</td>
                            }
                        </tr>
                        <tr>
                            <th>Low:</th>
                            {lowStat
                                ? <td>{(lowStat).toFixed(2)}</td>
                                : <td className="text-secondary">...</td>
                            }
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        </div>
    )
};

export default Card;