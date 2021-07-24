const csv = require('csv-parser')
const fs = require('fs')
const fetchService = require('./fetchService')

let currentPointer = 0
const urlHeader = 'product url';
const brandNameHeader = 'Brand Name';
let results = []
let stream = fs.createReadStream('./data/product.csv');
stream
    .pipe(csv())
    .on('data', (data) => {
        currentPointer++;
        results.push(data)
    })
    .on('end', async () => {
        console.log(`number of data :${currentPointer} parsed`)
        for (let index = 0; index < results.length; index++) {
            let data = results[index]
            let feature = await fetchService.fetchFeature(data[urlHeader], data[brandNameHeader])
            console.log(feature)
        }

    });