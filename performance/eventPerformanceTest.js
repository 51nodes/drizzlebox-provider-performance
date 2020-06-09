const Web3 = require('web3');
const abi = require('./StorageABI');

const web3Provider = new Web3('ws://127.0.0.1:23000');

const defaultAccount = '0xed9d02e382b34818e88B88a309c7fe71E65f419d';
const storageContractAddress = '0x9d13C6D3aFE1721BEef56B55D303B09E021E27ab';

const storageContract = new web3Provider.eth.Contract(
    abi, storageContractAddress);

const transactionObject = {
    from: defaultAccount,
    to: storageContractAddress,
    gasPrice: 0,
    gas: 800000
}

var eventEmitted;

//Calculating difference between setting the Storage and firing the SetStorage Event
async function transactionToEventPerformance() {

       await storageContract.once('StorageSet', {
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
