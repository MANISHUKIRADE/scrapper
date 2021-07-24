const NodeCache = require("node-cache");
const productCache = new NodeCache();
const resultCache = new NodeCache();
const urlHeader = 'product url';
const brandNameHeader = 'Brand Name';
const fetchService = require('./fetchService')
const features = 'features'
const writerService = require('./fileWriter')

productCache.on('set', async function (key, value) {
    let feature = await fetchService.fetchFeature(value[urlHeader], value[brandNameHeader])
    value[features] = feature;
    resultCache.set(key, value)
    return
})

resultCache.on('set', async function (key, value) {
    await writerService.writeCsv(value)
    resultCache.del(key)
})
module.exports = {
    productCache,
}