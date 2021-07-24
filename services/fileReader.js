const csv = require('csv-parser')
const fs = require('fs')
const { productCache } = require('./cacheManager')
let currentPointer = 0
let stream = fs.createReadStream('./data/product.csv');
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
    });