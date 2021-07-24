const csv = require('csv-parser')
const fs = require('fs')
const { productCache } = require('./cacheManager')

module.exports = {
    fileReader: function (filename) {
        return new Promise(function (resolve, reject) {
            let currentPointer = 0;
            let stream = fs.createReadStream(filename);
            stream
                .pipe(csv())
                .on('data', (data) => {
                    stream.pause();
                    currentPointer++;
                    productCache.set(currentPointer, data);
                    stream.resume();
                })
                .on('end', () => {
                    console.log(`number of data :${currentPointer} parsed`)
                    resolve('file read complete')
                })
                .on('error', (err) => {
                    console.log(`error while reading file ${JSON.stringify(err)}`);
                    reject(err)
                })
        })
    }
}
