import React, { useState } from 'react';
import InputDropdown from './InputDropdown';

type SearchInputProps = {
    handleStockSelect: (e: any) => void,
}

const SearchInput:  React.FC<SearchInputProps> = ({ handleStockSelect }) => {

    const [inputValue, setInputValue] = useState<String>('');
    
    const handleChange = (e: any) => {
        setInputValue(e.target.value);
    }

    const handleClick = (e: any) => {
        handleStockSelect(e);
    }

    const onSubmit = async (e: any) => e.preventDefault(); 

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
                onSubmit={onSubmit}
                className="d-flex flex-column w-100 align-items-center"       
            >
                <label data-testid="label">
                    Search up to 3 stocks and pin them to the dashboard to compare them:
                </label>
                <input 
                    data-testid="input"
                    className="mt-4 p-2"
                    style={{width: '300px',}}
                    type="text" 
                    onChange={handleChange} 
                />
            </form>
            <div className="d-flex justify-content-center">
            {(inputValue !== '') &&
                <InputDropdown
                    inputValue={inputValue}
                    handleClick={handleClick}
                />
            }
            </div>
        </div>
    );
};

export default SearchInput;