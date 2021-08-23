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
    const [price, setPrice] = useState<String>('');
    const [changePercentStat, setChangePercentStat] = useState<String>('');
    const [highStat, setHighStat] = useState<String>('');
    const [lowStat, setLowStat] = useState<String>('');
    
    const handleClick = (stock: String) => {
        removeStock(stock);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                let overviewRes = await overviewResponse(pinnedStock);
                setCurrency(overviewRes.data["Currency"]);
                
                let globalQuoteRes = await globalQuoteResponse(pinnedStock);
                setPrice(globalQuoteRes.data["Global Quote"]["05. price"]);
                setName(overviewRes.data["Name"]);
                setChangePercentStat(globalQuoteRes.data["Global Quote"]["10. change percent"]);
                setHighStat(globalQuoteRes.data["Global Quote"]["03. high"]);
                setLowStat(globalQuoteRes.data["Global Quote"]["04. low"]);

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
                boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 20%)',
                borderRadius: '20px',
            }} 
            className="p-3 m-3"
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
                    style={{
                        borderRadius: '50%',
                        backgroundColor: '#e25353',
                        boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 20%)',
                        height: '30px',
                        color: 'white',
                        width: '30px',
                        textAlign: 'center',
                        fontWeight: 'lighter',
                        padding: '1px',
                    }} 
                    onClick={() => handleClick(pinnedStock)}
                >
                    x
                </span>
            </div>
            {price && changePercentStat ? (
                <div className="d-flex"> 
                    <div style={{fontSize: '42px'}}>
                        {(changePercentStat[0] === '-') 
                            ? <div style={{color: '#e25353', alignSelf: 'center'}} className="bi bi-arrow-down"></div>
                            : <div style={{color: '#8dda9d', alignSelf: 'center'}} className="bi bi-arrow-up"></div>
                        }
                    </div>
                    <div>
                        <h4>{currency !== '' ? currency : 'USD'} {price}</h4>
                        <p>{changePercentStat}</p>
                    </div>
                </div>
            ) : (
                <p className="text-secondary">Stock data currently unavailable...</p>
            )}
            <React.Fragment>
                <h5>Stats:</h5>
                <table>
                    <tbody>
                        <tr>
                            <th>High:</th>
                            {highStat
                                ? <td>{highStat}</td>
                                : <td className="text-secondary">...</td>
                            }
                        </tr>
                        <tr>
                            <th>Low:</th>
                            {lowStat
                                ? <td>{lowStat}</td>
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