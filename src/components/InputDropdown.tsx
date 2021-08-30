import React, { useEffect, useState } from 'react';
import { searchResponse } from '../api/urls';

type InputDropdownProps = {
    inputValue: String,
    handleClick: (e: any) => void;
}

const InputDropdown:  React.FC<InputDropdownProps> = ({ inputValue, handleClick }) => {
    
    const [dropdownList, setDropdownList] = useState<Array<any>>([]);

    const handleStockSelect = (e: any) => {
        handleClick(e);
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                let searchRes = await searchResponse(inputValue);
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

    }, [inputValue]);

    return ( 
        <div>
            {(dropdownList.length > 0)
                ? <ul 
                    data-testid="dropdown"
                    className="
                        p-0 
                        list-unstyled 
                        shadow 
                        overflow-auto" 
                    style={{
                        width: '300px', 
                        maxHeight: '180px',
                    }}
                >
                    {dropdownList.map((stock, index) => {
                        return (
                            <li
                                key={index} 
                                onClick={handleStockSelect} 
                                style={{
                                    height: '45px',
                                    lineHeight: '2.5em',
                                }}
                                role="button"
                                className={`
                                    border-bottom
                                    mb-0
                                    px-1
                                    dropdownListClass
                                    bg-${(index % 2) 
                                        ? 'light' 
                                        : 'white'}
                                `}
                            >
                                {stock['1. symbol']}
                            </li>
                            );
                    })}
                </ul>
                : <p 
                    className="bg-light p-2 shadow" 
                    style={{
                        width: '300px',
                    }}
                >
                    No suggestions...
                </p>
            }
        </div>
    )
}

export default InputDropdown;