const csv = require('csv-parser')
const fs = require('fs')
const { productCache } = require('./cacheManager')
const brandNameHeader = 'Brand Name';

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
                    console.log(data[brandNameHeader])
                    data[brandNameHeader] = data[brandNameHeader].toLowerCase()
                    data[brandNameHeader] = data[brandNameHeader].trim()
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
