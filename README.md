# drizzlebox-provider-performance

A repository using the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) and implementing the [drizzle trufflebox](https://www.trufflesuite.com/boxes/drizzle).

This repository is used for testing purposes. 


## Performance testing WebsocketProvider vs. HttpProvider

Some testing scripts are located under `performance`. These script can be used to test the performance of a given Provider. 

The `performance/eventPerformanceTest.js` script aims to measure the time between a transaction (storageSet) and the Event callback. 

The `performance/readWritePerformance.js` script aims to measure the execution time of either writing or reading from a storage for a single or multiple times. 


## Running the test 

You will need to have the quorum local raft network up and running. 

In the folder `drizzlebox-provider-performance` run
- `npm install`

Following this you need to deploy the contracts to the quorum network, note the SimpleStorage contract address.
- `truffle migrate --network quorumlocal`

Now edit the `storageContractAddress` constant in the testing script you want to execute.

### RPC

For testing the RPC connection use 

```
const web3Provider = new Web3('http://127.0.0.1:22000');

const storageContract = new web3Provider.eth.Contract(
        abi, storageContractAddress);
```

### Websocket

For testing the Websocket connection use 

```
const web3Provider = 'ws://127.0.0.1:23000'

const provider = new Web3.providers.WebsocketProvider(
    web3Provider,
    { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
const web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });

const storageContract = new web3.eth.Contract(
        abi, storageContractAddress);
```

By this time you should be able to execute the tests using
- `node performance/readWritePerformanceTest.js writeSingle`
- `node performance/readWritePerformanceTest.js writeMultiple`
- `node performance/readWritePerformanceTest.js readSingle`
- `node performance/readWritePerformanceTest.js readMultiple`   
- `node performance/eventPerformanceTest.js `





