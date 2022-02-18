/* ===== SHA256 with Crypto-js ===================================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js      |
|  =============================================================*/

const { SHA256 } = require('crypto-js');

/* ===== Block Class ===================================
|  Class with a constructor for block data model       |
|  ====================================================*/

class Block {
    constructor(body) {
        this.height = null;
        this.timestamp = new Date().getTime();
        this.previousBlockHash = null;
        this.hash = null;
        this.body = body;
    } 

    calculateHash() {
        try {
            return SHA256(`${this.height}${JSON.stringify(this.body)}${this.timestamp}${this.previousBlockHash}`).toString();
        } catch(error) {
            console.error(error);
        }
    }

    getHeader() {
        try {
            return {
                height: this.height,
                timestamp: this.timestamp,
                previousBlockHash: this.previousBlockHash,
                hash: this.hash
            };
        } catch(error) {
            console.error(error);
        }
    }

    getBody() {
        try {
            return this.body;
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = Block;