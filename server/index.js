const Koa = require('koa')
const app = new Koa()
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
