import { useParams } from 'react-router'
import { object } from 'yup/lib/locale'
import { Movie } from '../models/movie'

//get /api/movies
export const allMoviesAPI = (req, res, next) => {
    Movie.find().select('-reviews').exec((err, movies)=> {
        if(err) {
            res.json({success: false, message: "Query Failed"})
            res.end()
        } else {
            res.write(JSON.stringify(movies))
            res.end()
        }
    })
}

//get api/movies/:id
export const oneMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err) {
            res.json({success: false, message: "Query Failed"})
            res.end()
        } else {
            res.write(JSON.stringify(movie))
            res.end()
        }
    })
}


//post api/movies
export const createMovieAPI = (req, res, next) => {
    let movie = new Movie(req.body)
    movie.added_at = new Date(),
    movie.updated_at = new Date()
    movie.save(err=> {
        if(err) {
            res.json({success: false, message: "Movie creation failed."})
            res.end()
        } else {
            res.end()
        }
    })
}

//put api/movies/:id
export const updateMovieAPI = (req, res, next) => {
    Movie.findOne({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err) {
            res.json({success: false, message: "Movie couldn't be found"})
            res.end()
        } else {
            Object.assign(movie, req.body)
            movie.updated_at = new Date()
            movie.save(err => {
                if(err) {
                    res.json({success: false, message: "Movie couldn't be updated."})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}

//delete api/movies/:id
export const deleteMovieAPI = (req, res, next) => {
    Movie.findOne({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err) {
            res.json({success: false, message: "Movie couldn't be deleted"})
            res.end()
        } else {
            Movie.findByIdAndDelete(req.params.id, err=> {
                if(err) {
                    res.json({success: false, message: "Movie couldn't be deleted."})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}