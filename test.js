import Blockchain from './blockchain/Blockchain.js';
import Transaction from './blockchain/Transaction.js';
import Wallet from './blockchain/Wallet.js';
import Miner from './blockchain/miner.js';
const blockchain = new Blockchain();

const wallet1 = new Wallet();
const wallet2 = new Wallet();

console.log(wallet1.getPublicKey());
console.log(wallet2.getPublicKey());

const miner = new Miner(blockchain);

miner.mine(miner.getPublicKey());

const tx1 = new Transaction(wallet1.getPublicKey(), wallet2.getPublicKey(), 5);
const tx2 = new Transaction(wallet2.getPublicKey(), wallet1.getPublicKey(), 10);
tx2.signTransaction(wallet2);
tx1.signTransaction(wallet1);
blockchain.addTransaction(tx1);
blockchain.addTransaction(tx2);

miner.mine(miner.getPublicKey());

console.log('Balance of miner is', blockchain.getBalanceOfAddress(miner.getPublicKey()));
console.log('Balance of wallet1 is', blockchain.getBalanceOfAddress(wallet1.getPublicKey()));
console.log('Balance of wallet2 is', blockchain.getBalanceOfAddress(wallet2.getPublicKey()));