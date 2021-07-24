var queue = require('../')

var q = queue({ results: [] })

productCache.on('set', async function (key, value) {
    productCache.del(key)
    return
})
module.exports = {
    productCache
}