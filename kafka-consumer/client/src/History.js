import React, {useState} from "react";
import refresh from "./logic/refresh";

function History() {

    const [result, setResult] = useState(null);

    return (
        <div>
            History:
            <button onClick={() => refresh().then(setResult)}>
                Refresh
            </button><br/>
            X: {result}
        </div>
    );
}

export default History;