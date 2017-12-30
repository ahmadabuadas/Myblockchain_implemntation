const SH256 = require('crypto-js/sha256');
class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() { //Cryptographic Hash Algorithm(digest). A cryptographic hash  SHA-256 generates an almost-unique 256-bit (32-byte) 
            return SH256(this.index + this.previousHash + this.timestamp +
                JSON.stringify(this.data) + this.nonce).toString(); // JSON.stringify is method converts a JavaScript value to a JSON string
        }
        //prove of work or mining 
        //bitcoin for example requaird the hash of block to bigen with amount of zero
        //defecult to influence the output to the hash function you simply have to try lot of combination --> this requird a lot of 
        /// computing power 500 bigest computer in the world call " difficulty"
        /// use yhis mecanisem can control how much time need to add new block to ower chain
    miningBlock(difficulty) { // its number
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) { //take difficulty number like first 5 digit of hash 
            this.nonce++; //just to add some random              //keep run if not this 5 digit = 00000
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }

}


class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }

    getLatesBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatesBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.miningBlock(this.difficulty); // update add block with mining function
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}


let savjeecoin = new Blockchain();

/* savjeecoin.addBlock(new Block(1, "12/1/2018", { amount: 4 }));
savjeecoin.addBlock(new Block(2, "14/1/2018", { amount: 10 }));
//console.log(JSON.stringify(savjeecoin, null, 4));
console.log("are this block chain is valid?" + savjeecoin.isChainValid());

savjeecoin.chain[1].data = { amount: 100 };  
savjeecoin.chain[1].hash = savjeecoin.chain[1].calculateHash(); ///the hash is change so the next block point to old hash
                                                                     // this make the chain broken */

//after minig
savjeecoin.addBlock(new Block(1, "12/1/2018", { amount: 4 }));
savjeecoin.addBlock(new Block(2, "14/1/2018", { amount: 10 }));

console.log("are this block chain is valid?" + savjeecoin.isChainValid());

//console.log(JSON.stringify(savjeecoin, null, 4));