const Blockchain = require('../src/blockchain');
const Block = require('../src/block');
const { GENESIS_BLOCK_DATA } = require('../src/constants');

describe('Blockchain', () => {
    let blockchain = new Blockchain();


    it('should create a new blockchain', () => {
        expect(blockchain instanceof Blockchain).toBeTruthy();
        expect(blockchain.chain.length).toEqual(1);
        expect(blockchain.chain[0].body).toEqual(GENESIS_BLOCK_DATA);
    });

    it('should create and add block', () => {
        const block = blockchain.createBlock('test');

        blockchain.addBlock(block);

        expect(block instanceof Block).toBeTruthy();
        
        expect(blockchain.chain.length).toEqual(2);
        expect(blockchain.chain[1].body).toEqual('test');
        expect(blockchain.chain[1].previousBlockHash).toEqual(blockchain.chain[0].hash);
    })

    it('should return previous block hash', () => {
        expect(blockchain.getPreviousBlockHash({ height: 1 })).toEqual(blockchain.chain[0].hash);
    })
    
    it('should get latest block', () => {
        blockchain.addBlock(blockchain.createBlock('test1'));

        expect(blockchain.getLatestBlock().body).toEqual('test1');
    })

    it('should get block by height, hash, timestamp. body or previousBlockHash', () => {
        const block = blockchain.createBlock({ amount: 4 });

        blockchain.addBlock(block);

        expect(blockchain.getBlock({ height: 3 })).toEqual(block);
        expect(blockchain.getBlock({ hash: block.hash })).toEqual(block);
        expect(blockchain.getBlock({ timestamp: block.timestamp })).toBeDefined();
        expect(blockchain.getBlock({ body: block.body })).toEqual(block);
        expect(blockchain.getBlock({ previousBlockHash: block.previousBlockHash })).toEqual(block);
    })

    it('should get blocks containing hash, timestamp, body or includesBody', () => {
        const block = blockchain.createBlock({ amount: 10 });

        blockchain.addBlock(block);

        expect(blockchain.getBlocks({ containsHash: block.hash }).length).toBe(1);
        expect(blockchain.getBlocks({ timestamp: block.timestamp }).length).toBe(1);
        expect(blockchain.getBlocks({ body: block.body }).length).toBe(1);
        expect(blockchain.getBlocks({ bodyIncludes: 'amount' }).length).toBe(2);
    })
});