const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }

        console.log("Block mined: " + this.hash)
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 4
    }

    createGenesisBlock() {
        return new Block(0, "07/01/2021", "Genesis block", "0")
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock)
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            // If current block has right hash 
            if (currentBlock.hash !== currentBlock.calculateHash())
                return false

            // If current block's has right previous hash 
            if (currentBlock.previousHash !== previousBlock.hash)
                return false

            return true
        }
    }
}



let AlobCoin = new Blockchain()

console.log("Mining block 1...")
AlobCoin.addBlock(new Block(1, "10/01/2021", {amount: 4}))

console.log("Mining block 2...")
AlobCoin.addBlock(new Block(2, "12/01/2021", {amount: 1}))

console.log("Is: " + AlobCoin.isChainValid())

//AlobCoin.chain[1].data = {amout: 2}
//console.log("Is: " + AlobCoin.isChainValid())

console.log(JSON.stringify(AlobCoin, null, 4))