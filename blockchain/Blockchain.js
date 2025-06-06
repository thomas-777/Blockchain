import Block from "./Block.js";
import Transaction from "./Transaction.js";
class Blockchain{
    constructor(){
        this.chain=[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingTransactions=[];
        this.miningReward=100;
    }
    createGenesisBlock(){
        return new Block(Date.now().toString(), '0', []);
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(minerAddress){
        if(this.pendingTransactions.length===0){
            console.log('No transactions to mine');
            return;
        }
        const rewardtx = new Transaction(null, minerAddress, this.miningReward);
        this.pendingTransactions.push(rewardtx);
        const block=new Block(Date.now().toString(),this.getLatestBlock().hash, this.pendingTransactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');
        this.chain.push(block);
        this.pendingTransactions=[];
    }

    addTransaction(transaction){

        if(!transaction.senderAddress || !transaction.recipientAddress){
            throw new Error('Transaction must include from and to address');
        }
        if(!transaction.isValid()){
            throw new Error('Cannot add invalid transaction to chain');
        }
        if(this.getBalanceOfAddress(transaction.senderAddress)<transaction.amount){
            console.log('Not enough balance');

        }
        else
        {this.pendingTransactions.push(transaction);}
    }

    getBalanceOfAddress(address){
        let balance=10;
        for(const block of this.chain){
            for(const tx of block.transactions){
                if(tx.senderAddress===address){
                    balance-=tx.amount;
                }
                if(tx.recipientAddress===address){
                    balance+=tx.amount;
                }
            }
        }
        return balance; 

    }
}

export default Blockchain;