import React from 'react'
import MovieList from './MovieList'
import { BrowserRouter as Router} from 'react-router-dom'

export default function Main (){

    return (
        <Router>
            <div className="container">
                <header>
                    <h1>
                        Top 10 Movies: Kavon Blossom
                    </h1>
                </header>
                <MovieList />
            </div>
        </Router>
    )
}