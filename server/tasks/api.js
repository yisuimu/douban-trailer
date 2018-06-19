const rp = require('request-promise-native')

async function fetchMovie (item) {
    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const res = await rp(url)
    return res
}

;(async () => {
    let movies = [
        { 
            doubanId: 26964430,
            title: '同学两亿岁',
            rate: 6.4,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2523563427.jpg'
        },
        { 
            doubanId: 27203019,
            title: '想看你微笑',
            rate: 7.6,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2523541738.jpg'
        },
        
    ]
    movies.map(async movie => {
        let movieData = await fetchMovie(movie)
        try {
            movieData = JSON.parse(movieData)
            console.log(movieData.tags)
            console.log(movieData.summary)
        } catch (err) {
            console.log(err)
        }
    })

})()