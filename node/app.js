
const express = require('express');
const bodyParser = require('body-parser');
require('isomorphic-fetch');

const app = express();
app.use(bodyParser.json());


const daprPort = process.env.DAPR_HTTP_PORT; 
const daprGRPCPort = process.env.DAPR_GRPC_PORT;

const stateStoreName = `statestore`;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;
const port = 3000;

const exchangeRateEUR = 1 / 4.46;
const exchangeRateUSD = 1 / 3.67;
const EUR = "EUR";
const USD = "USD";

app.get('/exchange-rate', (req, res) => {
    let args = req.body;
    const currency = args['currency']
    const value = Number(args['value'])

    let rate = 1.0

    if (currency == EUR) {
        rate = exchangeRateEUR
    }

    if (currency == USD) {
        rate = exchangeRateUSD
    }
    
    let result = value * rate;
    res.send(result.toString());
  });

// app.post('/neworder', (req, res) => {
//     const data = req.body.data;
//     const orderId = data.orderId;
//     console.log("Got a new order! Order ID: " + orderId);

//     const state = [{
//         key: "order",
//         value: data
//     }];

//     fetch(stateUrl, {
//         method: "POST",
//         body: JSON.stringify(state),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then((response) => {
//         if (!response.ok) {
//             throw "Failed to persist state.";
//         }

//         console.log("Successfully persisted state.");
//         res.status(200).send();
//     }).catch((error) => {
//         console.log(error);
//         res.status(500).send({message: error});
//     });
// });

app.get('/ports', (_req, res) => {
    console.log("DAPR_HTTP_PORT: " + daprPort);
    console.log("DAPR_GRPC_PORT: " + daprGRPCPort);
    res.status(200).send({DAPR_HTTP_PORT: daprPort, DAPR_GRPC_PORT: daprGRPCPort })
});

app.listen(port, () => console.log(`Node App listening on port ${port}!`));