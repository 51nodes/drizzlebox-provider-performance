# drizzlebox-provider-performance

A repository using the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) and implementing the [drizzle trufflebox](https://www.trufflesuite.com/boxes/drizzle).

This repository is used for testing purposes. 


## Performance testing WebsocketProvider vs. HttpProvider

Some testing scripts are located under `performance`. These script can be used to test the performance of a given Provider. 

The `performance/eventPerformanceTest.js` script aims to measure the time between a transaction (storageSet) and the Event callback. 

The `performance/readWritePerformance.js` script aims to measure the execution time of either writing to a storage 30 times or reading from a storage for 30 times. 


## Running the test 

You will need to have the quorum local raft network up and running. 

In the folder `drizzlebox-provider-performance` run
- `npm install`

Following this you need to deploy the contracts to the quorum network, note the SimpleStorage contract address and the used account address, since this is the default account we will need later on. 
- `truffle migrate --network quorumlocal`

Now edit the `defaultAccount` and `storageContractAddress` constants in the testing script you want to execute.

By this time you should be able to execute the tests using
- `node performance/readWritePerformanceTest.js write`
- `node performance/readWritePerformanceTest.js read`
- `node performance/eventPerformanceTest.js `





