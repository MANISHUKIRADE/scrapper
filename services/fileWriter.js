const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter(); //Instantiate var
const urlHeader = 'product url';
const brandNameHeader = 'Brand Name';
const features = 'features'
var csvFilename = `./data/result-${Date.now()}.csv`;

writer.pipe(fs.createWriteStream(csvFilename))
module.exports = {
    writeCsv: async function (record) {
        await writer.write(record);
        return record;
    }
}