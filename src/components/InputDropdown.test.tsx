import { render, waitFor, act, screen } from '@testing-library/react';
import InputDropdown from './InputDropdown';
import axios from 'axios';

const mockInputValue: String = 'DE';
const mockHandleClick = (e: any) => jest.fn();

const axiosGetSpy = jest.spyOn(axios, 'get');

const mockData = {
    data: {
        bestMatches: [
        {
            '1. symbol': "DE",
            '2. name': "Deere & Company",
            '3. type': "Equity",
            '4. region': "United States",
            '5. marketOpen': "09:30",
            '6. marketClose': "16:00",
            '7. timezone': "UTC-04",
            '8. currency': "USD",
            '9. matchScore': "1.0000",
        },
        {
            '1. symbol': "DEA",
            '2. name': "Easterly Government Properties Inc",
            '3. type': "Equity",
            '4. region': "United States",
            '5. marketOpen': "09:30",
            '6. marketClose': "16:00",
            '7. timezone': "UTC-04",
            '8. currency': "USD",
            '9. matchScore': "1.0000",
        }

    ],
    }
};

describe("InputDropdown", () => {

    it("should NOT make axios call when inputValue empty", async () => {
        
        await act(async () => {
            render(<InputDropdown inputValue={''} handleClick={mockHandleClick} />);
          });

        expect(axiosGetSpy).toHaveBeenCalledTimes(0);
        expect(axiosGetSpy).not.toHaveBeenCalled();
    });

    it("should make axios call when inputValue populated", async () => {

        await waitFor(async () => {
            render(<InputDropdown inputValue={mockInputValue} handleClick={mockHandleClick} />);
          });

        expect(axiosGetSpy).toHaveBeenCalledTimes(1);
        expect(axiosGetSpy).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_API_URL}/query?function=SYMBOL_SEARCH&keywords=DE&apikey=${process.env.REACT_APP_API_KEY1}`);
    });

    it("renders dropdown with correct data", async () => {

        axiosGetSpy.mockImplementation(() => Promise.resolve(mockData));

        await waitFor(async () => {
            render(<InputDropdown inputValue={mockInputValue} handleClick={mockHandleClick} />);
        });

        expect(axiosGetSpy).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("dropdown"));
        expect(screen.queryByText("No suggestions...")).not.toBeInTheDocument();
        expect(screen.queryByText("DE")).toBeInTheDocument();
        expect(screen.queryByText("DEA")).toBeInTheDocument();
        expect(screen.queryByText("Deere & Company")).not.toBeInTheDocument();
        expect(screen.queryByText("DE")).toHaveStyle({cursor: 'pointer'});
    });
});