import Wallet from "./Wallet.js";  

class Miner extends Wallet{
    constructor(blockchain){
        super();
        this.blockchain=blockchain;
    }

    mine(mineraddress){
        this.blockchain.minePendingTransactions(mineraddress);
    }
}

export default Miner;