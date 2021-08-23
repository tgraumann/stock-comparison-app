import axios from 'axios';

export const searchResponse = (inputValue: String) => axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=SYMBOL_SEARCH&keywords=${inputValue}&apikey=${process.env.REACT_APP_API_KEY1}`);
export const overviewResponse = (pinnedStock: String) =>  axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=OVERVIEW&symbol=${pinnedStock}&apikey=${process.env.REACT_APP_API_KEY2}`);
export const globalQuoteResponse = (pinnedStock: String) => axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=GLOBAL_QUOTE&symbol=${pinnedStock}&apikey=${process.env.REACT_APP_API_KEY3}`);
export const firstStockResponse = (pinnedStocks: Array<String>) => axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=TIME_SERIES_DAILY&symbol=${pinnedStocks[0]}&apikey=${process.env.REACT_APP_API_KEY4}`);
export const currStockResponse = (stock: String) => axios.get(`${process.env.REACT_APP_BASE_API_URL}/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${process.env.REACT_APP_API_KEY5}`);