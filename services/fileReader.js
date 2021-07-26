const csv = require('csv-parser')
const fs = require('fs')
const jobQueue = require('./queueManager')
const brandNameHeader = 'Brand Name';
const productUrlHeader = 'product url';

module.exports = {
    fileReader: function (filename) {
        return new Promise(function (resolve, reject) {
            let currentPointer = 0;
            let stream = fs.createReadStream(filename);
            stream
                .pipe(csv())
                .on('data', async (data) => {
                    stream.pause();
                    currentPointer++;
                    data[brandNameHeader] = data[brandNameHeader].toLowerCase()
                    data[brandNameHeader] = data[brandNameHeader].trim()
                    let job = {
                        brandName: data[brandNameHeader],
                        productUrl: data[productUrlHeader]

                    }
                    await jobQueue.add(job)
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
