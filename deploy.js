const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'marine lottery mushroom innocent laugh nurse hip ostrich satisfy test tag twelve',
    'https://rinkeby.infura.io/v3/d67b218bea854f8a830e49b794a3ab0b'
);
const web3 = new Web3(provider);

const deploy = async () => { //This function is only made to use the async() - await syntax. Because you cannot use await outside of an existing function
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface)) //Interface is the ABI, it is the translation layer thats communicate data from the network over to the javascript world //Bytcode is our compiled contract
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};
deploy();