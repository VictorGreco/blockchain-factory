const Block = require('./block');
const { GENESIS_BLOCK_DATA } = require('./constants');

/* ===== Blockchain ===================================
|  Class with a constructor for blockchain data model  |
|  with functions to support:                          |
|     - createGenesisBlock()                           |
|     - getLatestBlock()                               |
|     - addBlock()                                     |
|     - getBlock()                                     |
|     - validateBlock()                                |
|     - validateChain()                                |
|  ====================================================*/

class Blockchain {
    constructor() {
        this.chain = [];

        this.addBlock(this.createGenesisBlock());
    }

    createGenesisBlock() {
        return this.createBlock(GENESIS_BLOCK_DATA);
    }

    createBlock(data) {
        let newBlock = new Block(data);

        const height = this.getChainHeight();
        const previousBlockHash = this.getPreviousBlockHash({ height });

        newBlock.refine({ height, previousBlockHash });

        return newBlock;
    }

    addBlock(newBlock) {
        this.chain.push(newBlock);
    }

    getPreviousBlockHash({ height }) {
        return this.chain[height - 1]?.hash || '0x';
    }

    getLatestBlock() {
        return this.chain[this.getChainHeight() - 1];
    }

    getBlock({ height, hash, timestamp, body, previousBlockHash }) {
        if (height) {
            return this.chain.find(block => block.height === height);
        }

        if (hash) {
            return this.chain.find(block => block.hash === hash);
        }

        if (timestamp) {
            return this.chain.find(block => block.timestamp === timestamp);
        }

        if (body) {
            return this.chain.find(block => JSON.stringify(block.body) === JSON.stringify(body));
        }

        if (previousBlockHash) {
            return this.chain.find(block => block.previousBlockHash === previousBlockHash);
        }
    }

    getBlocks({ containsHash, timestamp, body, bodyIncludes }) {
        if (containsHash) {
            return this.chain.filter(block => block.hash === containsHash || block.previousBlockHash === containsHash);
        }

        if (timestamp) {
            return this.chain.filter(block => block.timestamp === timestamp);
        }

        if (body) {
            return this.chain.filter(block => JSON.stringify(block.body) === JSON.stringify(body));
        }

        if (bodyIncludes) {
            return this.chain.filter(block => JSON.stringify(block.body).indexOf(bodyIncludes) > -1);
        }
    }

    getChainHeight() {
        return this.chain.length;
    }
}

module.exports = Blockchain;