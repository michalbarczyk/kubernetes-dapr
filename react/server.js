const express = require('express');
const path = require('path');
const request = require('request');

const app = express();

const port = 8080;
const daprPort = process.env.DAPR_HTTP_PORT || 3500;

const daprUrl = `http://localhost:${daprPort}/v1.0/invoke`;

// The name of the state store is specified in the components yaml file. 
// For this sample, state store name is specified in the file at: 
// https://github.com/dapr/quickstarts/blob/master/hello-kubernetes/deploy/redis.yaml#L4
const stateStoreName = `statestore`;
const stateUrl = `http://localhost:${daprPort}/v1.0/state/${stateStoreName}`;

/**
The following routes forward requests (using pipe) from our React client to our dapr-enabled services. 
Our Dapr sidecar lives on localhost:<daprPort>. 
We invoke other Dapr enabled services by calling /v1.0/invoke/<DAPR_ID>/method/<SERVICE'S_ROUTE>.
*/

app.post('/exchange-rate', async (req, res) => {
  const url = `${daprUrl}/node-currency-service/method/exchange-rate`;
  console.log(req)
  req.pipe(request(url)).pipe(res);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'client/build')));

// For all other requests, route to React client
app.get('*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}!`));
