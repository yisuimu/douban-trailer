const rp = require('request-promise-native')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

async function fetchMovie (item) {
    // const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
    const url = `http://api.douban.com/v2/movie/${item.doubanId}`
    const res = await rp(url)

    let body
    try {
        body = JSON.parse(res)
    }catch (err) {
        console.error(err)
    }
    // console.log(body)
    return body
}

;(async () => {
    // let movies = [
    //     { 
    //         doubanId: 26964430,
    //         title: '同学两亿岁',
    //         rate: 6.4,
    //         poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2523563427.jpg'
    //     },
    //     { 
    //         doubanId: 27203019,
    //         title: '想看你微笑',
    //         rate: 7.6,
    //         poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2523541738.jpg'
    //     }
    // ]

    let movies = await Movie.find({
        $or: [
            { summary: { $exists: false } },
            { summary: null },
            { title: '' },
            { summary: '' }
        ]
    })

    for (let i = 0; i < [movies[1]].length; i++) {
        let movie = movies[i]
        let movieData = await fetchMovie(movie)

        if (movieData) {
            let tags = movieData.tags || []
            movie.tags = []
            movie.summary = movieData.summary || ''
            movie.title = movieData.alt_title || movieData.title || ''
            movie.rawTitle = movieData.title || ''

            if (movieData.attrs) {
                movie.movieTypes = movieData.attrs.movie_type || []

                for (let i = 0; i < movie.movieTypes.length; i++) {
                    let item = movie.movieTypes[i]
                    let cat = await Category.findOne({
                        name: item
                    })
                    console.log('0000000')
                    console.log(cat)

                    if (!cat) {
                        cat = new Category({
                            name:item,
                            movies: [movie._id]
                        })
                    } else {
                        if (cat.movies.indexOf(movie._id) === -1) {
                            cat.movies.push(movie._id)
                        }
                    }
                    await cat.save()

                    if (!movie.category) {
                        movie.category.push(cat._id)
                    } else {
                        if (movie.category.indexOf(cat._id) === -1) {
                            movie.category.push(cat._id)
                        }
                    }
                }

                let dates = movieData.attrs.pubdate || []
                let pubdates = []

                dates.map(item => {
                    if (item && item.split('(').length > 0) {
                        let parts = item.split('(')
                        let date = parts[0]
                        let country = '未知'

                        if (parts[1]) {
                            country = parts[1].split(')')[0]
                        }

                        pubdates.push({
                            date: new Date(date),
                            country
                        })
                    }
                })

                movie.pubdate = pubdates
            }
            tags.forEach(tag => {
                movie.tags.push(tag.name)
            })

            console.log(movie)
            // await movie.save()
        }
    }
    // movies.map(async movie => {
    //     let movieData = await fetchMovie(movie)
    //     try {
    //         movieData = JSON.parse(movieData)
    //         console.log(movieData.tags)
    //         console.log(movieData.summary)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // })

})()