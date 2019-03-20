const fs = require('fs');
const readline = require('readline');

class FileHelper {

    constructor(){
        this.filePath = __dirname.replace('helpers', 'public/transaction_history.txt')
    }

saveTransactionToFile(transaction) {
    return new Promise((resolve,reject)=>{
        fs.appendFile(this.filePath, JSON.stringify(transaction) + '\n',(err)=>{
            if (err) return reject(err);
            resolve(true);
        })
    })
    
}

getAllTransactions() {
    return new Promise((resolve, reject)=>{
        const lineReader =  readline.createInterface({
            input: fs.createReadStream(this.filePath)
        })
        const allTransactions = [];
        lineReader.on('line', (line) => {
            allTransactions.push(JSON.parse(line.trim()));
        })
        lineReader.on("close", () => {
            return resolve(allTransactions);
        })
    })
}
}
module.exports = FileHelper