import mongoose from 'mongoose'
import { number } from 'yup'

const Schema = mongoose.Schema

let reviewSchema = new Schema({
    comment: String,
    posted_at: Date
})

let movieSchema = new Schema({
    id: Number,
    title: String,
    plot: String,
    poster: String,
    rated: String,
    rating: Number,
    votes: Number,
    genre: String,
    year: Number,
    imdbID: String,
    reviews: [reviewSchema]
})

export let Movie = mongoose.model("Movie", movieSchema)