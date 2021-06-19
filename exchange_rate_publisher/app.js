// ------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------------------------------

//const express = require('express');
const path = require('path');
const request = require('request');
const bodyParser = require('body-parser');

//const app = express();
//app.use(bodyParser.json());

const daprPort = process.env.DAPR_HTTP_PORT || 3500;
const daprUrl = `http://localhost:${daprPort}/v1.0`;
const port = 8080;
const pubsubName = 'exchangerate';

const exchangeRateEUR = 1 / 4.46;
const exchangeRateUSD = 1 / 3.67;



function getEurExchangeRate() {
    return {
        messageType: "EUR",
        message: exchangeRateEUR
    };
}

function getUsdExchangeRate() {
    return {
        messageType: "USD",
        message: exchangeRateUSD
    };
}


function intervalFunc() {
    const publishUrl = `${daprUrl}/publish/${pubsubName}/EUR`;
    request( { uri: publishUrl, method: 'POST', json: JSON.stringify(this.getEurExchangeRate), callback:  function(error, response, body) {
        console.log("response: ", response);
    }});
    console.log('published');
  }
  
setInterval(intervalFunc, 5000);

// app.post('/publish', (req, res) => {
//   console.log("Publishing: ", req.body);
//   const publishUrl = `${daprUrl}/publish/${pubsubName}/${req.body.messageType}`;
//   request( { uri: publishUrl, method: 'POST', json: req.body } );
//   res.sendStatus(200);
// });

//app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));