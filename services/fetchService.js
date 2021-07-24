const puppeteer = require('puppeteer');
const _ = require('lodash')
const brandSetting = require('./../config/brandUrl.json')
module.exports = {
    fetchFeature: async function (productUrl, brandName) {
        const brand = _.get(brandSetting, brandName)
        if (brand) {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto(productUrl);
                const features = await page.$$eval(brand.selector, (options) =>
                    options.map((option) => option.textContent))
                await browser.close();
                return features;
            } catch (err) {
                console.log('err', err)
                return err
            }
        }
        return 'Brand Name Not Found in setting'
    }
}