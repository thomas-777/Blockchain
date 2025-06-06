import { createHash } from "crypto";
class Block{
    constructor(datetime, previousHash, transactions){
        this.datetime = datetime;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.nonce=0;
        this.hash = this.calculateHash(datetime, previousHash, transactions, this.nonce);
    }

    calculateHash(datetime, previousHash, transactions, nonce) {
        return createHash('sha256').update(datetime + previousHash +  JSON.stringify(transactions) + nonce).digest('hex');
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash(this.datetime, this.previousHash, this.transactions, this.nonce);
        }
        console.log("Block mined: " + this.hash);
        return this.nonce;
        
    }
}
export default Block;