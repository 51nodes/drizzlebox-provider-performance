# drizzlebox-provider-performance

A repository using the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) and implementing the [drizzle trufflebox](https://www.trufflesuite.com/boxes/drizzle).

This repository is used for testing purposes. 

## Prerequisites

- [Node.js](https://nodejs.org/en/)


## Performance testing WebsocketProvider vs. HttpProvider

Some testing scripts are located under `performance`. These script can be used to test the performance of a given Provider. 

The `performance/readWritePerformance.js` script aims to measure the execution time of either writing or reading from a storage for a single or multiple times. 

The `performance/eventPerformanceTest.js` script aims to measure the time between a transaction (storageSet) and the Event callback. (Deprecated as web3 v2.0.0 does currently not support HttpProviders)


## Running the test 

You will need to have the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) up and running. 

In the folder `drizzlebox-provider-performance` run
- `npm install`

Following this you need to deploy the contracts to the quorum network, note the SimpleStorage contract address. If you deploy the contracts on a `fresh` network you will have the same contract adress at all times. If you choose to deploy the contracts on the same network again please edit the `storageContractAddress` in the /performance scripts you choose to run. 

- `npm run deploy-contract-quorumlocal`

To start the UI run following commands in app/src/

- `npm install`
- `npm run start`

Now connect to the UI via Metamask Custom RPC network and import the following account using its private key. 

`privateKey` = `E6181CAAFFFF94A09D7E332FC8DA9884D99902C7874EB74354BDCADF411929F1`

By this time you should be able to execute the tests passing the ```<providerType>```: ```ws``` or ```rpc```
- `node performance/readWritePerformanceTest.js <providerType> writeSingle`
- `node performance/readWritePerformanceTest.js <providerType> writeMultiple`
- `node performance/readWritePerformanceTest.js <providerType> readSingle`
- `node performance/readWritePerformanceTest.js <providerType> readMultiple`   
- `node performance/eventPerformanceTest.js ` (Deprecated)





