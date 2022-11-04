import React, { Component } from 'react';
import { addToFavourite, removeFromFavourites } from '../actions';

class MovieCard extends Component {

    handleFavouriteClick = () => {
        const { movie } = this.props;
        console.log("Favourite movie", movie);
        this.props.dispatch(addToFavourite(movie))
    }

    handleUnFavouriteClick = () => {
        const { movie } = this.props;
        this.props.dispatch(removeFromFavourites(movie))
    }
    render () {
        const { movie, isFavourite } = this.props;
        return (
            <div className='movie-card'>
                <div className='left'>
                    <img alt='movie-poster' src={movie.Poster} />
                </div>
                <div className='right'>
                    <div className='title'>
                        {movie.Title} ({movie.Year})
                    </div>
                    <div className='plot'>{movie.Plot}</div>
                    <div className='footer'>
                        <div className='rating'>{movie.imdbrating}</div>
                        {isFavourite ? (
                            <button
                             className='unfavourite-btn' 
                             onClick={this.handleUnFavouriteClick}
                            >
                                Unfavourite
                            </button>    
                        ) : (
                            <button
                             className='favourite-btn'
                             onClick={this.handleFavouriteClick}
                            >
                                Favourite
                            </button>

                        )}
                    </div>
                </div>
            </div>
        );
    }
  
}

export default MovieCard;
