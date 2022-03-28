import dotenv from 'dotenv';
dotenv.config();
import Caver from 'caver-js';
import db from '../models/index.js';
import BatcherAbi from '../api/abi/batcherAbi.js';

const caver = new Caver(process.env.BAOBA_NETWORK);

const startTask = async() => {
    let pendings = await db.Orderbook.findAll({
        attributes: ['transaction_hash'],
        where: {
            status: 'pending'
        },
        order: [
            ['id', 'ASC']
        ]
    });

    if(pendings.length > 0) {
        pendings = pendings.map((val) => {
            return val.dataValues.transaction_hash;
        })
        
        const pendingSet = [ ... new Set(pendings)]; // Tx hash만 있는 set 배열
        // console.log(pendingSet);
    
        for (let pending of pendingSet) {
            const txInfo = await caver.klay.getTransaction(pending);
            if(txInfo.blockNumber){
                await db.Orderbook.update(
                    {status: 'complete'},
                    {where: {
                        status: 'pending',
                        transaction_hash: pending
                    }}
                )
            }
            else{
                console.log(pending, ' -> pending status yet')
                break;
            }
        }
        
    }
    else {
        console.log('There is no pending Txs.')
    } 
   
    console.log('checking end!')
}

startTask();