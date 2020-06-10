# drizzlebox-provider-performance

A repository using the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) and implementing the [drizzle trufflebox](https://www.trufflesuite.com/boxes/drizzle).

This repository is used for testing purposes. 


## Performance testing WebsocketProvider vs. HttpProvider

Some testing scripts are located under `performance`. These script can be used to test the performance of a given Provider. 

The `performance/readWritePerformance.js` script aims to measure the execution time of either writing or reading from a storage for a single or multiple times. 

The `performance/eventPerformanceTest.js` script aims to measure the time between a transaction (storageSet) and the Event callback. (Deprecated as web3 v2.0.0 does not support RPC subscriptions)


## Running the test 

You will need to have the [quorum local raft network](https://github.com/51nodes/quorum-local-raft-network) up and running. 

In the folder `drizzlebox-provider-performance` run
- `npm install`

Following this you need to deploy the contracts to the quorum network, note the SimpleStorage contract address.
- `truffle migrate --reset --network quorumlocal`

Now edit the `storageContractAddress` constant in the testing script you want to execute.



By this time you should be able to execute the tests passing the ```<providerType>```: ```ws``` or ```rpc```
- `node performance/readWritePerformanceTest.js <providerType> writeSingle`
- `node performance/readWritePerformanceTest.js <providerType> writeMultiple`
- `node performance/readWritePerformanceTest.js <providerType> readSingle`
- `node performance/readWritePerformanceTest.js <providerType> readMultiple`   
- `node performance/eventPerformanceTest.js ` (Deprecated)





