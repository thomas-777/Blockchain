
import pkg from 'crypto-js';
import { createVerify } from 'crypto';
const { SHA256 } = pkg;
class Transaction{
    constructor(senderAddress, recipientAddress, amount){
        this.senderAddress=senderAddress;
        this.recipientAddress=recipientAddress;
        this.amount=amount;
        this.signature=null;
    }

    signTransaction(Wallet){
        if(Wallet.publicKey !== this.senderAddress){
            throw new Error('You cannot sign transactions for other wallets!');
        }
        if(this.signature){
            throw new Error('This transaction has already been signed!');
        }
        const hashTransaction=this.calculateHash();
        this.signature=Wallet.sign(hashTransaction);
    }
    calculateHash(){
        return SHA256(this.senderAddress + this.recipientAddress + this.amount).toString();
    }

    verifySignature(publicKey, signature, data){
        const verify = createVerify('SHA256');
        verify.update(data);
        verify.end();
        return verify.verify(publicKey, signature, 'hex');
    }
    isValid(){
        if(this.senderAddress===null) return true;
        if(!this.signature || this.signature.length===0){
            throw new Error('No signature in this transaction');
        }
        const hashTransaction=this.calculateHash();
        return this.verifySignature(this.senderAddress, this.signature, hashTransaction);
    }
}

export default Transaction;