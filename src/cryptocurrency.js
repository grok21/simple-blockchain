const {Blockchain, Transaction} = require('./cryptocurrency-blockchain')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const myKey = ec.keyFromPrivate('c7bd52209471adbbf5d541cd3017b36599980a51b6812a4d0dc37a98f18dd541')
const myWalletAddress = myKey.getPublic('hex')

// Create a new blockchain
let AlobCoin = new Blockchain()

// Create a new transaction
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10)
tx1.signTransaction(myKey)
AlobCoin.addTransaction(tx1)
console.log('Vadim balance: ' + AlobCoin.getBalaceOfAddress(myWalletAddress) + '\n')


console.log("Mining block 1...")
AlobCoin.minePendingTransactions(myWalletAddress)

console.log('Vadim balance: ' + AlobCoin.getBalaceOfAddress(myWalletAddress))
console.log('Is chain valid: ' + AlobCoin.isChainValid())
console.log(AlobCoin.chain)

console.log("\nMining block 2...")
AlobCoin.minePendingTransactions(myWalletAddress)

console.log('Vadim balance: ' + AlobCoin.getBalaceOfAddress(myWalletAddress))
console.log('Is chain valid: ' + AlobCoin.isChainValid())
