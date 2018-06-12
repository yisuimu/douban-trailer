const htmlTpl = require('./html')
const ejsTpl = require('./ejs')
module.exports = {
    htmlTpl: htmlTpl,
    ejsTpl: ejsTpl,
    pugTpl: require('./pug')
}