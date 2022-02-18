// init test code goes here
const Blockchain = require('./src/blockchain');

const coin = new Blockchain();

coin.addBlock(coin.createBlock({ amount: 4 }));

console.log(JSON.stringify(coin, null, 4));