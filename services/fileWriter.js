const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const csvFilename = `./data/result-${Date.now()}.csv`;

writer.pipe(fs.createWriteStream(csvFilename))
module.exports = {
    writeCsv: async function (record) {
        await writer.write(record);
        return record;
    }
}