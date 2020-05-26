const Web3 = require('web3');
const abi = require('./StorageABI');

const web3Provider = new Web3('ws://127.0.0.1:23001');

const defaultAccount = '0xcA843569e3427144cEad5e4d5999a3D0cCF92B8e';
const storageContractAddress = '0x14762Ab9aa10Ff45Eea605e380BdF18AbCf6074d';

const storageContract = new web3Provider.eth.Contract(
    abi, storageContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000
}

var eventFired;

//Calculating difference between setting the Storage and firing the SetStorage Event
async function transactionToEventPerformance() {

    await storageContract.once('StorageSet', {
        filter: {},
    }, function (error, event) {

        eventFired = new Date();
        console.log('Event Fired at: %dms', eventFired);

        calculate(eventFired, setStorage)

    });

    var setStorage = new Date();
    console.log('Storage set at: %dms', setStorage);

    storageContract.methods.set(1).send(transactionObject, function (error, result) { });

}

function calculate(eventFired, setStorage) {

    difference = eventFired - setStorage;

    console.log('difference is: %dms', difference)


}

transactionToEventPerformance();
