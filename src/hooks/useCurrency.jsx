import { useEffect, useState } from 'react';

function useCurrency() {
    let [allCurrencies, setAllCurrencies] = useState([]);

    let getCurrency = async () => {
        try {
            let response = await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_yxhlvmgatD4zwdDronOz3jtFeamXgophMMWZEo1B");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            let data = await response.json();
            setAllCurrencies(data);

        } catch (err) {
            console.error('Error fetching currency data:', err);
        }
    };


    useEffect(() => {
        getCurrency();  // Run once when the component mounts
    }, []);  // Empty dependency array ensures it runs only once

    // console.log(allCurrencies);  // Now this will show updated state

    return allCurrencies;
}

export default useCurrency;
