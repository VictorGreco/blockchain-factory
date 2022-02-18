const Blockchain = require('../src/blockchain');
const Block = require('../src/block');

describe('Blockchain', () => {
    let blockchain = new Blockchain();


    it('should create a new blockchain', () => {
        expect(blockchain instanceof Blockchain).toBeTruthy();
        expect(blockchain.chain.length).toEqual(1);
        expect(blockchain.chain[0].body).toEqual('Thank you ❤️ to use Blockchain Factory for your project - Genesis Block');
    });

    it('should create and add block', () => {
        const block = blockchain.createBlock('test');

        blockchain.addBlock(block);

        expect(block instanceof Block).toBeTruthy();
        
        expect(blockchain.chain.length).toEqual(2);
        expect(blockchain.chain[1].body).toEqual('test');
        expect(blockchain.chain[1].previousBlockHash).toEqual(blockchain.chain[0].hash);
    })
});