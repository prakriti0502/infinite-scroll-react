import React from 'react'
import MovieCard from './MovieCard'

const MovieComponent = ({movieInfo}) => {
  return (
    <div className='wrapper'>
        <div className="container">
            <h1>List of cards</h1>
            <div className="grid grid-three-column">
                {movieInfo.map((curr,id)=>{
                    return <MovieCard key={id} myData={curr}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default MovieComponent