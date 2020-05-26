const Web3 = require('web3');
const abi = require('./StorageABI');

const web3Provider = new Web3('ws://127.0.0.1:23001');

const defaultAccount = '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e';
const storageContractAddress = '0x624d400315312c6280F6dB7683ACf2128EbB9d46';

const storageContract = new web3Provider.eth.Contract(
    abi, storageContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000
}

//writing performance
async function writingPerformance() {
    var start = new Date()

    //Setting Storage for 30 times
    for (let index = 0; index <= 30; index++) {

        await storageContract.methods.set(index).send(transactionObject, function (error, result) { });

    }

    var end = new Date() - start;
    console.log("Writing performance test execution time: %dms", end)
}

//reading performance
async function readingPerformance() {
    var start = new Date()

    //getting storage at index position
    for (let index = 0; index <= 30; index++) {

        await web3Provider.eth.getStorageAt(storageContractAddress, index, function (error, result) { });

    }

    var end = new Date() - start;
    console.log("Reading performance test execution time: %dms", end);
}

async function runScript() {
    var message = process.argv[2];
    if (message === 'read') {
        await readingPerformance();
    } else if (message === 'write') {
        await writingPerformance();
    }
    process.exit();
}

runScript();
