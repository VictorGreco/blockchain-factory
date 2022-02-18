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
        return SHA256(`${this.height}${JSON.stringify(this.body)}${this.timestamp}${this.previousBlockHash}`).toString();
    }

    isRefined() {
        return !!this.height && this.timestamp && this.previousBlockHash && this.hash && JSON.stringify(this.body);
    }

    refine({ height, previousBlockHash }) {
        this.height = height || this.height;
        this.previousBlockHash = previousBlockHash || this.previousBlockHash;
        this.hash = this.calculateHash();
    }

    getHeader() {
        return {
            height: this.height,
            timestamp: this.timestamp,
            previousBlockHash: this.previousBlockHash,
            hash: this.hash
        }
    }

    getBody() {
        return this.body;
    }
}

module.exports = Block;