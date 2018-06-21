const puppeteer = require('puppeteer')

const base = 'https://movie.douban.com/subject/'
const doubanId = '27166974'
const videoBase = 'https://movie.douban.com/trailer/219491/#content'

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
})

;(async () => {
    console.log('start visit the target page')

    const brower = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })

    const page = await brower.newPage()
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })

    await sleep(1000)

    const result = await page.evaluate( () => {
        var $ = window.$
        var it = $('.related-pic-video')
         if (it && it.length > 0) {
            var link = it.attr('href')
            var cover = it.attr('style').replace(/background-image:url\(/, '')
            cover = cover.substr(0, cover.length - 2)
            return {
                link,
                cover
            }
         }
        return {}
    })
    console.log(1)
    console.log(result.cover)

    let video
    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000)
        video = await page.evaluate(() => {
            var $ = window.$
            var it = $('source')
            if (it && it.length > 0) {
                return it.attr('src')
            }
            return ''
        })
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }

    brower.close()
    process.send({data})
    process.exit(0)
})()