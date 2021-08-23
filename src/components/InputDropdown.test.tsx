import { render, fireEvent,  } from '@testing-library/react';
import InputDropdown from './InputDropdown';


describe("InputDropdown Test", () => {

    it("renders component correctly", () => {

        const handleStockSelect = jest.fn();
        const { getByTestId } = render(<InputDropdown handleStockSelect={handleStockSelect} />);
    
        expect(getByTestId("label")).toHaveTextContent("Search up to 3 stocks and pin them to the dashboard to compare them:");
        expect(getByTestId("input")).toBeTruthy;
    });
    
    it("updates on change", () => {

        const handleStockSelect = jest.fn();
        const { getByTestId } = render(<InputDropdown handleStockSelect={handleStockSelect} />);

        const searchInput = getByTestId("input") as HTMLInputElement;
        fireEvent.change(searchInput, {target: {value: "AAPL"}});
        expect(searchInput.value).toBe("AAPL");
        expect(searchInput.value).not.toBe("AAPLE");
    });
});