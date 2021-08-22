import axios from 'axios';
import { useEffect, useState } from 'react';

const InputDropdown = ({ handleStockSelect }) => {

    const [inputValue, setInputValue] = useState('');
    const [dropdownList, setDropdownList] = useState([]);
    
    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleClick = (e) => {
        handleStockSelect(e);
    }

    const suggestionsList = () => {
        return dropdownList.map((stock, index) => {
            return (
                <li 
                    key={index} 
                    onClick={handleClick} 
                    style={{
                        cursor: 'pointer',
                        height: '45px',
                        lineHeight: '2.5em',
                        borderBottom: '1px solid #bfbfbf8c',
                    }}
                    className={`
                        mb-0
                        dropdownListClass
                        bg-${(index % 2) 
                            ? 'light' 
                            : 'white'}
                    `}
                >
                    {stock['1. symbol']}
                </li>
                );
        });
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                let searchRes = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${process.env.REACT_APP_API_KEY1}`);
                if(searchRes.data.bestMatches) {
                    setDropdownList(searchRes.data.bestMatches);
                }
            } catch (err) {
                console.log('Error with dropdown search: ', err);
            }
        };
        
        if (inputValue.length) {
            fetchData();
        }
    }, [inputValue])

    return (
        <div 
            className="w-75 p-5 my-5" 
            style={{
                margin: '0 auto',
                boxShadow: '0px 0px 6px 0px rgb(0 0 0 / 20%)',
                borderRadius: '20px',
            }}
        >
            <form 
                className="d-flex flex-column w-100 align-items-center"       
            >
                <label>
                    Search up to 3 stocks and pin them to the dashboard to compare them:
                </label>
                <input 
                    className="mt-4 p-2"
                    style={{width: '300px',}}
                    type="text" 
                    onChange={handleChange} 
                />
            </form>
            <div className="d-flex justify-content-center">
            {(dropdownList.length && inputValue !== '')
                ? <ul 
                    className="p-0 position-absolute" 
                    style={{
                        listStyle: 'none', 
                        width: '300px', 
                        overflowY: 'scroll', 
                        maxHeight: '180px',
                        boxShadow: '0px 0px 6px 0px rgb(49 45 45 / 68%)', 
                    }}
                >
                    {suggestionsList()}
                </ul>
                : <p 
                    className="bg-light p-2" 
                    style={{
                        boxShadow: '0px 0px 6px 0px rgb(49 45 45 / 68%)', 
                        width: '300px',}}
                    >
                        No suggestions...
                    </p>
            }
            </div>
        </div>
    );
};

export default InputDropdown;