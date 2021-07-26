const Queue = require('bull');
const path = require('path');
const jobQueue = new Queue('JobQueue' + Date.now(), { redis: { port: 6379, host: '172.17.0.1', password: 'SUPER_SECRET_PASSWORD' } }); // Specify Redis connection using object
const writer = require('./fileWriter')
const brandNameHeader = 'Brand Name';
const productUrlHeader = 'product url';
const featureHeader = 'feature'
const startTime = Date.now()
jobQueue.process(5, path.join(__dirname, '../services/fetchService.js'))



jobQueue.on('completed', async function (job, result) {
    // Job completed with output result!
    const data = {}
    data[productUrlHeader] = job.data.productUrl
    data[brandNameHeader] = job.data.brandName
    data[featureHeader] = result
    await writer.writeCsv(data)
    jobQueue.getJobCounts().then(res => console.log('Job Count:\n', res));
})


jobQueue.on('failed', async (job, err) => {
    console.log(err)
    jobQueue.getJobCounts().then(res => console.log('Job Count:\n', res));
})
jobQueue.on('drained', async function () {
    let timeRequired = Date.now() - startTime
    console.log('Time Required', secondsToHms(timeRequired / 1000))
})


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}
module.exports = jobQueue;