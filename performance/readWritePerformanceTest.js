const Web3 = require('web3');
const fs = require('fs');
const contract = JSON.parse(fs.readFileSync(__dirname + '/../app/src/contracts/SimpleStorage.json', 'utf8'));

const defaultAccount = '0xed9d02e382b34818e88B88a309c7fe71E65f419d';
const storageContractAddress = '0x624d400315312c6280F6dB7683ACf2128EbB9d46';

const providerType = process.argv[2];

var web3;
if (providerType === 'rpc') {
    web3 = new Web3('http://127.0.0.1:22000');
} else if (providerType === 'ws') {
    const provider = new Web3.providers.WebsocketProvider(
        'ws://127.0.0.1:23000',
        { clientConfig: { keepalive: true, keepaliveInterval: 5000 } });
    web3 = new Web3(provider, null, { transactionConfirmationBlocks: 1 });
} else {
    console.log('Missing argument: providerType (rpc | ws)');
    process.exit(1);
}

console.log('Testing on providerType: ', providerType)

const storageContract = new web3.eth.Contract(
    contract.abi, storageContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000,

}

async function setStorage() {

    return promisify(cb => storageContract.methods.set(1).send(transactionObject, cb));

}

//multiple writes performance
async function multipleWritesPerformance() {

    var start = new Date()

    //Setting Storage for 30 times
    for (let index = 0; index <= 30; index++) {

        const txHash = await setStorage();

    }

    var end = new Date() - start;
    console.log("Writing performance test execution time: %dms", end)
}


//single write performance
async function singleWritePerformance() {

    var start = new Date()

    const txHash = await setStorage();

    var end = new Date() - start;
    console.log("Writing performance test execution time: %dms", end)
}

//multiple reads performance
async function multipleReadsPerformance() {

    var start = new Date()

    //getting storage at index position
    for (let index = 0; index <= 30; index++) {

        await web3.eth.getStorageAt(storageContractAddress, index);

    }

    var end = new Date() - start;
    console.log("Reading performance test execution time: %dms", end);
}

//single read performance
async function singleReadPerformance() {

    var start = new Date()

    //getting storage at position 0
    await web3.eth.getStorageAt(storageContractAddress, 0);

    var end = new Date() - start;
    console.log("Reading performance test execution time: %dms", end);
}

const promisify = (inner) =>
    new Promise((resolve, reject) =>
        inner((err, res) => {
            if (err) { reject(err) }

            resolve(res);
        })
    );


async function runScript() {
    var message = process.argv[3];
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
    process.exit();
}

runScript();
