import React, {useState} from "react";
import convert from "../logic/convert";

function Converter() {

    const [currency, setCurrency] = useState("EUR");
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(null);

    return (
        <div>
            Currency:
            <select value={currency} onChange={e => setCurrency(e.target.value)}>
                <option value="EUR">Euro</option>
                <option value="USD">US Dollars</option>
            </select><br/>
            Amount: 
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} /><br/>
            <button onClick={() => convert(currency, amount).then(setResult)}>
                Convert
            </button><br/>
            Converted: {result}
        </div>
    );
}

export default Converter;