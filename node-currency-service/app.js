
// const express = require('express');
// const bodyParser = require('body-parser');
// //require('isomorphic-fetch');

// const app = express();
// // Dapr publishes messages with the application/cloudevents+json content-type
// app.use(bodyParser.json({ type: 'application/*+json' }));


// const daprPort = process.env.DAPR_HTTP_PORT; 
// const daprGRPCPort = process.env.DAPR_GRPC_PORT;

// const port = 3000;

// const exchangeRateEUR = 1 / 4.46;
// const exchangeRateUSD = 1 / 3.67;
// const EUR = "EUR";
// const USD = "USD";

// app.post('/exchange-rate', (req, res) => {
//     console.log('got it')
//     let args = req.body;
//     const currency = args['currency']
//     const value = Number(args['value'])

//     let rate = 1.0

//     if (currency == EUR) {
//         rate = exchangeRateEUR
//     }

//     if (currency == USD) {
//         rate = exchangeRateUSD
//     }
    
//     let result = value * rate;
//     res.send(result.toString());
//   });

// app.get('/ports', (_req, res) => {
//     console.log("DAPR_HTTP_PORT: " + daprPort);
//     console.log("DAPR_GRPC_PORT: " + daprGRPCPort);
//     res.status(200).send({DAPR_HTTP_PORT: daprPort, DAPR_GRPC_PORT: daprGRPCPort })
// });

// app.post('*', (req, res) => {
//     //console.log('got it 2')
//     res.status(200).send({test: req.url})
// })

// app.get('/dapr/subscribe', (_req, res) => {
//     res.json([
//         {
//             pubsubname: "pubsub",
//             topic: "A",
//             route: "A"
//         },
//         {
//             pubsubname: "pubsub",
//             topic: "B",
//             route: "B"
//         }
//     ]);
//     console.log("Subscribed for A & B");
// });

// app.post('/A', (req, res) => {
//     console.log("A: ", req.body.data.message);
//     res.sendStatus(200);
// });

// app.post('/B', (req, res) => {
//     console.log("B: ", req.body.data.message);
//     res.sendStatus(200);
// });

// app.listen(port, () => console.log(`Node App listening on port ${port}!`));

// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
require('isomorphic-fetch');

const app = express();
// Dapr publishes messages with the application/cloudevents+json content-type
app.use(bodyParser.json({ type: 'application/*+json' }));

const port = 3000;


app.get('/dapr/subscribe', (_req, res) => {
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

app.post('/EUR', (req, res) => {
    console.log("EUR: ", req.body.data.message);
    res.sendStatus(200);
});

app.post('/USD', (req, res) => {
    console.log("USD: ", req.body.data.message);
    res.sendStatus(200);
});


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

app.listen(port, () => console.log(`Node App listening on port ${port}!`));
