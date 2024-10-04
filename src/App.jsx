import React, { useCallback, useState, useEffect } from 'react';
import './index.css';
import InputCurrency from './components/InputCurrency';
import useCurrency from "./hooks/useCurrency";  // Import the hook, not the data directly
import Heading from './components/Heading';

function App() {
  const myStyle = {
    backgroundImage: "url('pics/currency-pic.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    opacity: 0.8,
    height: "100vh",   // Full height of the viewport
    width: "100vw",    // Full width of the viewport
  };

  let [from, setFrom] = useState(0);
  let [to, setTo] = useState(0);
  let [fromCurrency, setFromCurrency] = useState("INR");
  let [toCurrency, setToCurrency] = useState("INR");

  // Fetch currencies using the useCurrency hook
  const allCurrencies = useCurrency();  // Call the hook inside the component

  let swap = useCallback(() => {
    let a = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(a);
    // console.log(fromCurrency);
    // console.log(toCurrency)
  }, [setFromCurrency, setToCurrency, toCurrency, fromCurrency]);


  const fetchExchangeRate = useCallback(async () => {
    try {
      let response = await fetch(
        `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_yxhlvmgatD4zwdDronOz3jtFeamXgophMMWZEo1B&currencies=${toCurrency}&base_currency=${fromCurrency}`
      );
      let data = await response.json();
      // console.log(toCurrency)
      setTo(Math.floor(Number(data.data[toCurrency]) * Number(from)));
      // console.log(data); // Process the data here
      console.log("from " + from);
      console.log("to " + data.data[toCurrency]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [fromCurrency, toCurrency, from, setTo]);  // Use dependencies correctly


  useEffect(() => {
    fetchExchangeRate();  // Fetch exchange rates whenever the currencies change
  }, [fetchExchangeRate]);

  return (
    <div style={myStyle} className="flex items-center justify-center">

      <div className="w-full max-w-lg">
        <Heading />
        <InputCurrency
          label='From'
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          to={to}  // Fixed: use 'to' prop instead of 'To'
          setTo={setTo}
          from={from}
          setFrom={setFrom}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
          options={allCurrencies.data ? Object.keys(allCurrencies.data) : []}  // Pass the currency options
        />
        <div className='flex justify-center items-center'>
          <button
            type='submit'
            className='bg-yellow-500 text-white p-2 rounded-md w-16 h-12'
            onClick={(event) => { event.preventDefault(); swap(); }}
          >
            swap
          </button>
        </div>

        <InputCurrency
          label='To'
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          from={from}
          to={to}  // Fixed: use 'to' prop instead of 'To'
          setTo={setTo}
          setFrom={setFrom}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
          options={allCurrencies.data ? Object.keys(allCurrencies.data) : []}  // Pass the currency options
        />
      </div>
    </div>
  );
}

export default App;
