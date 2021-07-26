const puppeteer = require('puppeteer');
const _ = require('lodash')
const brandSetting = require('./../config/brandUrl.json')
module.exports = async function (job) {
    const brand = _.get(brandSetting, job.data.brandName)
    if (brand) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(job.data.productUrl);
            const features = await page.$$eval(brand.selector, (options) =>
                options.map((option) => option.textContent))
            await browser.close();
            return features;
        } catch (err) {
            console.log('err', err)
            throw err
        }
    }
    return 'Brand Name Not Found in setting'
}
