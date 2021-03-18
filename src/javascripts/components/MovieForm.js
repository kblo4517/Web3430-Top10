import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {MovieContext} from './MovieList'
import StarRating from './StarRating'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
toast.configure()


export function VHelp ({message}) {
    return <p className="help">{message}</p>
}
const validationSchema = yup.object({
    id: yup.number().required(),
    title: yup.string().required(),
    year: yup.number().required(),
    poster: yup.string().url().required(),
    plot: yup.string().required(),
    releaseDate: yup.date().required(),
    rating: yup.number().required(),
    votes: yup.number().required(),
    imdbID: yup.number().required(),
    genre: yup.string().required(),
    rated: yup.string().required(),
    year: yup.number().required().min(1900).max(new Date().getFullYear()),
    reviews: yup.string().required()

})
export default function MovieForm () {
    let {movies, setMovies} = useContext(MovieContext)
    let {mid} = useParams()

    let movie = mid ? movies.find(m => m.id == mid) : {} 
    let is_new = mid === undefined
    let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
        initialValues: is_new ? {
            id: "",
            title: "",
            year: "",
            poster: "",
            plot: "",
            releaseDate: "",
            rating: "",
            votes: "",
            imdbID: "",
            genre: "",
            rated: "",
            year: new Date().getFullYear(),
            reviews: ""
        } : {...movie},
        validationSchema,
        onSubmit(values) {
            if(is_new) {
              let id = movies.length
              while(true) {
                  let mv = movies.find(m => m.id == id++)
                  if(mv === undefined) break
              }  

              values.id = id
              movies.push(values)
            } else {
                let mv = movies.find(m => m.id == movie.id)
                Object.assign(mv, values)
            }

            setMovies([...movies])
            history.push('/movies')
            toast(is_new ? "Successfully added" : "Successfully updated")
        }
    })
    

    const history = useHistory()

    return (
        <form onSubmit={handleSubmit}>
            <h1>Adding/Editing a Movie</h1>

            <div className="field">
                <label htmlFor="id">ID</label>
                <div className="control">
                    <input type="text" name="id" value={values.id} onChange={handleChange}/>
                   <VHelp message={errors.id} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="title">Title</label>
                <div className="control">
                    <input type="text" name="title" value={values.title} onChange={handleChange}/>
                   <VHelp message={errors.title} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="releaseDate">Release Date</label>
                <div className="control">
                    <DatePicker  name="releaseDate" selected={values.releaseDate} onChange={date => setFieldValue('releaseDate', date)}/>
                   <VHelp message={errors.releaseDate} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="poster">Poster</label>
                <div className="control">
                    <input type="url" name="poster" value={values.poster} onChange={handleChange}/>
                    <VHelp message={errors.poster} />

                </div>
            </div>

            <div className="field">
                <label htmlFor="plot">Plot</label>
                <div className="control">
                    <textarea type="text" name="plot" value={values.plot} onChange={handleChange}></textarea>
                  <VHelp message={errors.plot} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="rating">Rating</label>
                <div className="control">
                    <input type="text" name="rating" value={values.rating} onChange={handleChange}></input>
                    <VHelp message={errors.rating} />

                </div>
            </div>

            <div className="field">
                <label htmlFor="votes">Votes</label>
                <div className="control">
                    <input type="text" name="votes" value={values.votes} onChange={handleChange}></input>
                  <VHelp message={errors.votes} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="genre">Genre</label>
                <div className="control">
                    <input type="text" name="genre" value={values.genre} onChange={handleChange}></input>
                    <VHelp message={errors.genre}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="rated">Rated</label>
                <div className="control">
                    <input type="text" name="rated" value={values.rated} onChange={handleChange}></input>
                    <VHelp message={errors.rated}/>
                </div>
            </div>

            <div className="field">
                <label htmlFor="year">Year</label>
                <div className="control">
                    <input type="text" name="year" value={values.year} onChange={handleChange}></input>
                  <VHelp message={errors.year} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="imdbID">imdbID</label>
                <div className="control">
                    <input type="text" name="imdbID" value={values.imdbID} onChange={handleChange}></input>
                  <VHelp message={errors.imdbID} />
                </div>
            </div>

            <div className="field">
                <label htmlFor="reviews">Reviews</label>
                <div className="control">
                    <input type="text" name="reviews" value={values.reviews} onChange={handleChange}></input>
                  <VHelp message={errors.reviews} />
                </div>
            </div>

            <div className="field">
                <label></label>
                <div className="control">
                    <button className="primary">Submit</button>
                    <button className="primary" onClick={()=> history.push('/movies')}>Cancel</button>
                </div>
            </div>

            
        </form>
    )
}