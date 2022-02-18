const Block = require('./block');

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
        try {
    
            return this.createBlock("Thank you ❤️ to use Blockchain Factory for your project - Genesis Block");
        } catch (error) {
            console.error(error);
        }
    }

    createBlock(data) {
        try {  
            let newBlock = new Block(data);

            const height = this.getChainHeight();
            const previousBlockHash = this.getPreviousBlockHash({ height });

            newBlock.refine({ height, previousBlockHash });
    
            return newBlock;
        } catch (error) {
            console.error(error);
        }
    }

    addBlock(newBlock) {
        try {  
            this.chain.push(newBlock);

        } catch (error) {
            console.error(error);
        }
    }

    getPreviousBlockHash({ height }) {
        try {
            return this.chain[height - 1]?.hash || '0x';
        } catch(error) {
            console.error(error);
        }
    }

    getLatestBlock() {
        return this.chain[this.getChainHeight() - 1];
    }

    getBlock({ height, hash, timestamp, body, previousBlockHash }) {
        try {
            if (height) {
                return this.chain[height];
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

            throw new Error('Invalid block search criteria');

        } catch (error) {
            console.error(error);
        }
    }

    getChainHeight() {
        try {
            return this.chain.length;
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = Blockchain;