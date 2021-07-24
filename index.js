const fileService = require('./services/fileReader')

fileService.fileReader('./data/product.csv').then(console.log).catch(console.log)
