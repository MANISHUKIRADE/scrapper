const Queue = require('bull');
const path = require('path');
const jobQueue = new Queue('Browser Job Queue', { redis: { port: 6379, host: '172.17.0.1', password: 'SUPER_SECRET_PASSWORD' } }); // Specify Redis connection using object
const writer = require('./fileWriter')
const brandNameHeader = 'Brand Name';
const productUrlHeader = 'product url';
const featureHeader = 'feature'
jobQueue.process(5, path.join(__dirname, '../services/fetchService.js'))



jobQueue.on('completed', async function (job, result) {
    // Job completed with output result!
    const data = {}
    data[brandNameHeader] = job.data.brandName
    data[productUrlHeader] = job.data.productUrl
    data[featureHeader] = result
    await writer.writeCsv(data)

})


jobQueue.on('failed', async (job, err) => {
    console.log(err)
})

module.exports = jobQueue;