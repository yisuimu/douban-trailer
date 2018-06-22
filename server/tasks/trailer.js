const cp = require('child_process')
const { resolve } = require('path')

// http://vt1.doubanio.com/201806202034/da77b00e10ade927a91bc241b17fb442/view/movie/M/402320247.mp4
;(async () => {
    const script = resolve(__dirname, '../crawler/video')
    const child = cp.fork(script, [])
    let invoked = false

    child.on('error', err => {
        if (invoked) return
        invoked = true
        console.log(err)
    })
    child.on('exit', code => {
        if (invoked) return
        invoked = false
        let err = code === 0 ? null : new Error('exit code ' + code)
        console.log(err)
    })
    child.on('message', data => {
        // let result = data.result
        //https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2524955059.jpg
        console.log(data)
    })
})()