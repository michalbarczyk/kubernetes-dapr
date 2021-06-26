const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const pubsubParser = bodyParser.json({ type: 'application/*+json' })
const exRateParser = bodyParser.json({ type: 'application/json' })

const port = 3000;
let exchangeRateEUR = 1 / 4.46;
let exchangeRateUSD = 1 / 3.67;
const EUR = "EUR";
const USD = "USD";

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const kafkaUrl = `http://localhost:${daprPort}/v1.0/bindings/sample-topic`;

function isRequestCorrect(message) {
    console.log("Received currency rate: ", message);
    if (isNaN(message)) {
        console.log("This request is incorrect");
        return false;
    } else {
        console.log("This request is correct");
        return true;
    }
}

function logToKafka(message) {
    body = { 
        "data": message, 
        "operation": "create"
    }
    request( { uri: kafkaUrl, method: 'POST', json: body } );
}

app.get('/dapr/subscribe', pubsubParser, (_req, res) => {
    res.json([
        {
            pubsubname: "pubsub",
            topic: "EUR",
            route: "EUR"
        },
        {
            pubsubname: "pubsub",
            topic: "USD",
            route: "USD"
        }
    ]);
});

app.post('/EUR', pubsubParser, (req, res) => {
    const rate = req.body.data.message;
    if (isRequestCorrect(rate)) {
        exchangeRateEUR = rate;
    }
    res.sendStatus(200);
});

app.post('/USD', pubsubParser, (req, res) => {
    const rate = req.body.data.message;
    if (isRequestCorrect(rate)) {
        exchangeRateUSD = rate;
    }
    res.sendStatus(200);
});

app.post('/exchange-rate', exRateParser, (req, res) => {
    let args = req.body;
    const currency = args['currency']
    const value = Number(args['value'])
    console.log('exchange-rate args: ', args)

    let rate = 1.0

    if (currency == EUR) {
        rate = exchangeRateEUR
    }

    if (currency == USD) {
        rate = exchangeRateUSD
    }
    
    let result = value * rate;
    console.log('Value: ', value, ' Rate: ', rate, ' Result: ', result);
    res.send(result.toString());
    logToKafka({ "Value": value, "Rate": rate, "Result": result })
  });

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
