import React, { useCallback, useId } from 'react';
// import { v4 as uuidv4 } from 'uuid';

function InputCurrency({
    label = 'From',
    fromCurrency,
    toCurrency,
    to,
    setTo,
    from,
    setFrom,
    setFromCurrency,
    setToCurrency,
    options = ['usd', 'inr', 'rs'],
}) {
    let inputId = useId();

    let changeAmount = useCallback((e) => {
        if (label === 'From') {
            setFrom(e.target.value);
        }
    }, [label, setFrom]);

    return (
        <div className="bg-blue-400 opacity-80 p-6 rounded-lg shadow-lg flex justify-between h-40 items-center">
            <div className="flex flex-col items-center justify-center w-44">
                <label htmlFor={inputId} className="text-white mb-2 font-bold">{label}</label>
                <input
                    type="number"
                    id={inputId}
                    value={label === "From" ? from : to}
                    min="0"
                    max="100"
                    step="1"
                    onChange={changeAmount}
                    className="p-2 rounded-lg w-full m-1"
                />
            </div>
            <div className="flex flex-col items-center justify-center w-44">
                <label className="text-white mb-2 font-bold">Select Currency Type</label>
                <select
                    value={label === 'From' ? fromCurrency : toCurrency} // Change the default based on the label
                    className='w-40 p-2 m-1 rounded-md'
                    onChange={(e) => {
                        if (label === "From") {
                            setFromCurrency(e.target.value); // Call the setter directly
                        } else {
                            setToCurrency(e.target.value); // Call the setter directly
                        }
                    }}
                >
                    {options.map((optionVal) => (
                        <option key={optionVal} value={optionVal}>{optionVal}</option> // Use optionVal as key
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputCurrency;
