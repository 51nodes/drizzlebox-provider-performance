const Web3 = require('web3');
const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('../app/src/contracts/SimpleStorage.json', 'utf8'));

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


const storageContract = new web3.eth.Contract(
    contract.abi, storageContractAddress);


const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000
}

var eventEmitted;

//Calculating difference between setting the Storage and firing the SetStorage Event
async function transactionToEventPerformance() {

    storageContract.once('StorageSet', {
        filter: {},
    }, function (error, event) {

        eventEmitted = new Date();
        console.log('Event emitted at: %dms', eventEmitted);

        calculate(eventEmitted, setStorage);

    });

    var setStorage = new Date();
    console.log('Storage set at: %dms', setStorage);

    storageContract.methods.set(1).send(transactionObject, function (error, result) { });

}

function calculate(eventEmitted, setStorage) {

    difference = eventEmitted - setStorage;

    console.log('difference is: %dms', difference)


}

transactionToEventPerformance();
