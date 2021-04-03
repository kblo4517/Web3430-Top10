//function component

import React, { useContext, useState } from 'react'
import {FaThumbsUp} from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import StarRating from './StarRating'
import Modal from 'react-modal'
import {MovieContext} from './MovieList'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {format} from 'date-fns'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


export default function Movie(props) {

    //need access to movie list to update state through context 
    let {movies, setMovies, authenticated, setAuthentication} = useContext(MovieContext)
    let [modalOpen, setModalOpen] = useState(false)

    const m = props.movie
    const onLike = props.onLike
    const history = useHistory()


    const deleteMovie = () => {
        fetch(`/api/movies/${m.id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json"
          },
          credentials: 'same-origin',
        }). then(() => {
            toast('Successfully submitted', {
                onClose: () => {
                    document.location= "/movies"
                }
            })

            setModalOpen(false)
        }). catch((error) => {
            toast('Failed to Submit', {
                onClose: ()=> {
                    document.location= "/movies"
                }
            })
        })
    }

    return (
      <>
      <div className="card">
        <img src={m.poster} alt={m.title}/>
        <h2>{m.title}</h2>
        <p>{m.plot} <strong>Release Date</strong>: {format(m.releaseDate,'MM/dd/yyyy')}</p>
        <ul className="extra">
          <li><StarRating selectedStars ={Math.floor(m.rating / 2)} />{m.rating}</li>
          <li><strong>{m.votes}</strong>votes</li>
          <li><FaThumbsUp color="maroon" onClick={onLike}/><small>{m.likes ? m.likes : 0}</small></li>
        </ul>
        <button className="primary" onClick={() => history.push(`/movies/${m.id}/edit`)}>Edit</button>
        <button className="primary" onClick={() => {
          if(authenticated) setModalOpen(true)
          else document.location = '/signin'
          }}>Delete</button>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to delete this movie?</p>
        <button className="primary" onClick={deleteMovie}>Confirm Delete</button>
        <button className="primary" onClick={() => setModalOpen(true)}>Cancel</button>
      </Modal>
      </>
    )
  }