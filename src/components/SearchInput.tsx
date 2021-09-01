import React, { useState } from 'react';
import InputDropdown from './InputDropdown';

type SearchInputProps = {
    handleStockSelect: (e: React.FormEvent<HTMLInputElement>) => void,
}

const SearchInput:  React.FC<SearchInputProps> = ({ handleStockSelect }) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
        handleStockSelect(e);

        // hide dropdown menu when user selects stock from dropdown
        setInputValue('');
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => e.preventDefault(); 

    return (
        <div 
            className="
                w-75 
                p-5 
                my-5 
                rounded 
                shadow-sm 
                border" 
            style={{
                margin: '0 auto',
                height: '200px',
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
                    style={{width: '250px',}}
                    type="text" 
                    onChange={handleChange} 
                    value={inputValue}
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