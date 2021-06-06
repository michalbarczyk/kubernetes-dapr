
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

app.post('/exchange-rate', (req, res) => {
    console.log('got it')
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

app.get('/ports', (_req, res) => {
    console.log("DAPR_HTTP_PORT: " + daprPort);
    console.log("DAPR_GRPC_PORT: " + daprGRPCPort);
    res.status(200).send({DAPR_HTTP_PORT: daprPort, DAPR_GRPC_PORT: daprGRPCPort })
});

app.post('*', (req, res) => {
    console.log('got it 2')
    res.status(200).send({test: req.url})
})

app.listen(port, () => console.log(`Node App listening on port ${port}!`));