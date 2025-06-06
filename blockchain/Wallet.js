import crypto from 'crypto';
// import { getPendingTransactions } from '../wallet/index.js'; // Adjust the import path as necessary
import Block from './Block.js';
import Transaction from './Transaction.js';
class Wallet{
    #privateKey;
    constructor(){
        this.balance=10;
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem'
            }
        });
        this.publicKey=publicKey;
        this.#privateKey=privateKey;
        this.blockchain=null;
        this.peers=[];
    }
    getPublicKey(){
        return this.publicKey;
    }
    sign(data){
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        sign.end();
        return sign.sign(this.#privateKey, 'hex');
    }

    getBalance(){
        return this.balance;
    }

    mine(){
        // const pendingTransactions=getPendingTransactions();
        //  if(pendingTransactions.length===0){
        //     console.log('No transactions to mine');
        //     return;
        // }
        const rewardtx = new Transaction(null, this.getPublicKey(), this.blockchain.miningReward);
        pendingTransactions.push(rewardtx);
        const block=new Block(Date.now().toString(),this.blockchain.getLatestBlock().hash, pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        return block;
    }
    
}
export default Wallet;