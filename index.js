const fileService = require('./services/fileReader')

let feature = fileService.fileReader('./data/product.csv').then(console.log).catch(console.log)
