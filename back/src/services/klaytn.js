import dotenv from 'dotenv';
dotenv.config();

// ERC20 
import Erc20Abi from '../api/abi/erc20Abi.js'
import Erc20Bytecode from '../api/abi/erc20Bytecode.js'

// ERC721
import Erc721Abi from '../api/abi/erc721Abi.js'
import Erc721Bytecode from '../api/abi/erc721Bytecode.js';

// Batcher
import BatcherAbi from '../api/abi/batcherAbi.js';
import BatcherBytecode from '../api/abi/batcherBytecode.js';

import UserInterface from '../services/user.js';

import Caver from 'caver-js';

class KlaytnService {
    #Erc20Bytecode;
    #Erc20Abi;
    #Erc721Bytecode;
    #Erc721Abi;
    #BatcherBytecode;
    #BatcherAbi;
    #server;
    #myErc20Contract;
    #myErc721Contract;
    #myBatcherContract;
    #Erc20Address;
    #Erc721Address;
    #BatcherAddress;

    constructor() {
        this.caver = new Caver(process.env.BAOBAB_NETWORK);
        this.#server = this.caver.klay.accounts.wallet.add(process.env.SERVER_PRIVATEKEY);

        this.#Erc20Bytecode = Erc20Bytecode;
        this.#Erc20Abi = Erc20Abi;
        this.#Erc721Bytecode = Erc721Bytecode;
        this.#Erc721Abi = Erc721Abi;
        this.#BatcherBytecode = BatcherBytecode;
        this.#BatcherAbi = BatcherAbi;

        if(process.env.ERC20_ADDRESS != ''){ // 이미 배포한 erc20 contract가 있음
            console.log('erc20 컨트랙트 배포 완료');
            this.setMyErc20Contract(process.env.ERC20_ADDRESS);
        }
        else {
            console.log('Erc20 컨트랙트 배포 필요')
            this.#myErc20Contract = new this.caver.klay.Contract(this.#Erc20Abi);
        }

        if(process.env.ERC721_ADDRESS != ''){ // 이미 배포한 erc20 contract가 있음
            console.log('erc721 컨트랙트 배포 완료');
            this.setMyErc721Contract(process.env.ERC721_ADDRESS);
        }
        else {
            console.log('Erc721 컨트랙트 배포 필요')
            this.#myErc721Contract = new this.caver.klay.Contract(this.#Erc721Abi);
        }

        if(process.env.BATCHER_ADDRESS != '') { // 이미 배포한 batcher contract가 있음
            console.log('Batcher 컨트랙트 배포 완료');
            this.setMyBatcherContract(process.env.BATCHER_ADDRESS);
        }
        else{
            console.log('Batcher 컨트랙트 배포 필요')
            this.#myBatcherContract = new this.caver.klay.Contract(this.#BatcherAbi);
        }

        this.UserServiceInterface = new UserInterface();

    }

    setMyErc20Contract(erc20Addr){
        try{
            this.#Erc20Address = erc20Addr;
            this.#myErc20Contract = new this.caver.klay.Contract(this.#Erc20Abi, erc20Addr, {
                from: this.#server.address // server Addr
            }); 
            return true;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    setMyErc721Contract(erc721Addr){
        try{
            this.#Erc721Address = erc721Addr;
            this.#myErc721Contract = new this.caver.klay.Contract(this.#Erc721Abi, erc721Addr, {
                from: this.#server.address // server Addr
            }); 
            return true;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    setMyBatcherContract(batcherAddr){
        try{
            this.#BatcherAddress = batcherAddr;
            this.#myBatcherContract = new this.caver.klay.Contract(this.#BatcherAbi, batcherAddr, {
                from: this.#server.address
            });
            return true;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async getServerKlay() { 
        try{
            var balance = await this.caver.klay.getBalance(this.#server.address);
            balance = (Number(balance)/1000000000000000000).toString();
            return balance;
        }
        catch(err){
            throw Error(err.toString());
        }
    }

    async deployErc20() { 
        try{
            if(process.env.ERC20_ADDRESS != ''){
                throw Error('ERC20 contract already deployed');
            }

            let payload = {data: this.#Erc20Bytecode};
            let parameter = {
                from: this.#server.address,
                gas: 20000000,
                value: 0
            }
            var _transactionHash;
            const {_address} = await this.#myErc20Contract.deploy(payload)
            .send(parameter, (err, transactionHash) => {
                if(err){
                    throw Error(err.toString());
                }
                _transactionHash = transactionHash;
            });

            if(!this.setMyErc20Contract(_address)){
                throw Error(err.toString());
            };
            
            return {ERC20ContractAddress: _address, ERC20ContractTxHash: _transactionHash};
        }
        catch(err) {
            console.log("ERC20: \n", err)
            throw Error(err.toString());
        }

    }

    async deployErc721() {
        try{
            if(process.env.ERC721_ADDRESS != ''){
                throw Error('ERC721 contract already deployed');
            }

            let payload = {data: this.#Erc721Bytecode};
            let parameter = {
                from: this.#server.address,
                gas: 20000000,
                value: 0
            }
            var _transactionHash;
            const {_address} = await this.#myErc721Contract.deploy(payload)
            .send(parameter, (err, transactionHash) => {
                if(err){
                    throw Error(err.toString());
                }
                _transactionHash = transactionHash;
            });

            if(!this.setMyErc721Contract(_address)){
                throw Error("setMyErc721Contract: \n", err.toString());
            };

            await this.#myErc721Contract.methods.setToken(this.#Erc20Address)
            .send({from: this.#server.address, to: this.#Erc721Address, gas: 2000000});
            
            return {ERC721ContractAddress: _address, ERC721ContractTxHash: _transactionHash};
        }
        catch(err){
            console.log("ERC721: \n", err)
            throw Error(err.toString());
        }
    }

    async deployBatcher() { 
        try{
            if(process.env.BATCHER_ADDRESS != ''){
                throw Error('BATCHER contract already deployed');
            }
            // batcher contract deploy
            let payload = {
                data: this.#BatcherBytecode,
                arguments: [this.#Erc20Address, this.#Erc721Address]
            };
            let parameter = {
                from: this.#server.address,
                gas: 20000000,
                value: 0
            }
            var _transactionHash;

            const {_address} = await this.#myBatcherContract.deploy(payload)
            .send(parameter, (err, transactionHash) => {
                if(err){
                    throw Error(err.toString());
                }
                _transactionHash = transactionHash;
            });


            // change erc20 contract owner
            const receipt20 = await this.#myErc20Contract.methods.transferOwnership(_address)
            .send({from: this.#server.address, to: this.#Erc20Address, gas: 2000000});

            const receipt721 = await this.#myErc721Contract.methods.transferOwnership(_address)
            .send({from: this.#server.address, to: this.#Erc721Address, gas: 2000000});

            if(!this.setMyBatcherContract(_address)){
                throw Error(err.toString());
            }
            
            return {BatcherContractAddress: _address, BatcherContractTxHash: _transactionHash};
        }
        catch(err){
            console.log("Batcher: \n", err)
            throw Error(err.toString());
        }
    }

    async getTokenBalance(user_id) {
        try{
            const user = await this.UserServiceInterface.getOneUser(user_id);
            const balance = await this.#myErc20Contract.methods.balanceOf(user.address).call();
            const allowance = await this.#myErc20Contract.methods.allowance(user.address, this.#server.address).call();
            console.log(balance, allowance);
            return {balance, allowance};
        }
        catch(err){
            console.log(err);
            throw Error(err.toString());
        }
    }

    async getNftBalance(user_id) {
        try{
            const user = await this.UserServiceInterface.getOneUser(user_id);
            const balance = await this.#myErc721Contract.methods.balanceOf(user.address).call();
            return {balance};
        }
        catch(err) {
            console.log(err);
            throw Error(err.toString());
        }
    }
}

export default KlaytnService;