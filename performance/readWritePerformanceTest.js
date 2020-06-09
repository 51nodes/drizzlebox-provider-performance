const Web3 = require('web3');
const abi = require('./StorageABI');

const web3Provider = new Web3('http://127.0.0.1:22000');

const defaultAccount = '0xed9d02e382b34818e88B88a309c7fe71E65f419d';
const storageContractAddress = '0x986328359e6CE90a98b89b4b6F19Aa6Ea527F1b7';

const storageContract = new web3Provider.eth.Contract(
        abi, storageContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000,

}


async function setStorage(){

        await storageContract.methods.set(1).send(transactionObject)
        .on('receipt', (receipt) => {
            console.log(receipt)

        });

}

//multiple writes performance
async function multipleWritesPerformance() {

    var start = new Date()

    //Setting Storage for 30 times
    for (let index = 0; index <= 30; index++) {
        await setStorage();
    }


    var end = new Date() - start;
    console.log("Writing performance test execution time: %dms", end)
}


//single write performance
async function singleWritePerformance() {

    var start = new Date()

        await setStorage();

    var end = new Date() - start;
    console.log("Writing performance test execution time: %dms", end)
}

//multiple reads performance
async function multipleReadsPerformance() {

    var start = new Date()

    //getting storage at index position
    for (let index = 0; index <= 30; index++) {

        await web3Provider.eth.getStorageAt(storageContractAddress, index, function (error, result) { });

    }

    var end = new Date() - start;
    console.log("Reading performance test execution time: %dms", end);
}

//single read performance
async function singleReadPerformance() {

    var start = new Date()

    //getting storage at position 0
    await web3Provider.eth.getStorageAt(storageContractAddress, 0, function (error, result) { });

    var end = new Date() - start;
    console.log("Reading performance test execution time: %dms", end);
}

async function runScript() {
    var message = process.argv[2];
    if (message === 'readMultiple') {
        await multipleReadsPerformance();
    } else if (message === 'readSingle') {
        await singleReadPerformance();
    }
    else if (message === 'writeMultiple') {
        await multipleWritesPerformance();
    }
    else if (message === 'writeSingle') {
        await singleWritePerformance();
    }
}

runScript();
