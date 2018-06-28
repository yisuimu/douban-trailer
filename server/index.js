const Koa = require('koa')
const mongoose = require('mongoose')
const { connect, initSchemas } = require('./database/init')
const app = new Koa()

;(async () => {
    await connect()

    initSchemas()
    // require('./tasks/movie')
    require('./tasks/api')
    // const Movie = mongoose.model('Movie')
    // const movies = await Movie.find({})
    // console.log(movies)
})()
// const { htmlTpl, ejsTpl, pugTpl }  = require('./tpl')
// const ejs = require('ejs')
// const pug = require('pug')
const views = require('koa-views')
const { resolve } = require('path')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    // ctx.type = 'text/html;charset=utf-8;'
    // ctx.body = pug.render(pugTpl, {
    //     you: 'luke',
    //     me: 'yangyang'
    // })
    await ctx.render('index', {
        you: 'luke',
        me: 'yangyang'
    })
})
app.listen(4455)
