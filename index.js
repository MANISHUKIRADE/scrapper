const fetchService = require('./fetchFeature')
const productUrl = 'https://www.philips.co.in/c-p/GC2147_30/easyspeed-plus-steam-iron';
const brandName = 'philips';

(async function () {
    let feature = await fetchService.fetchFeature(productUrl, brandName)
    console.log(feature)
})()