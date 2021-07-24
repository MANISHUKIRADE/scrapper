const NodeCache = require("node-cache");
const productCache = new NodeCache();
const urlHeader = 'product url';
const brandNameHeader = 'Brand Name';
const fetchService = require('./fetchService')


productCache.on('set', async function (key, value) {
    let feature = await fetchService.fetchFeature(value[urlHeader], value[brandNameHeader])
    console.log(feature)
    productCache.del(key)
    return
})
module.exports = {
    productCache
}