import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from '../actions';
import { data as movieList } from '../data';

class App extends React.Component {
  componentDidMount () {
    this.props.dispatch(addMovies(movieList));
  }

  isMovieFavourite = (movie)  => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1) {
      // found the movie
      return true;
    }
    return false;
  }
  changeTab = (val) => {
    this.props.dispatch(setShowFavourites(val))
  }
  render() {
    const { movies, search } = this.props; // will return {movies: {}, search: {}}
    console.log('movies', movies);
    const { favourites, list, showFavourites } = movies;
    const displayMovies = showFavourites ? favourites : list;
    
    return (
      <div className="App">
        <Navbar search = {search} />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? '' : 'active-tabs'}`}
              onClick={() => this.changeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? 'active-tabs' : '' }`}
              onClick={() => this.changeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={index} 
                dispatch={this.props.dispatch} 
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component {
//   render() {
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     );
//   }
// }

function callback (state) {
  return {
    movies: state.movies,
    search: state.movies
  }
};
const connectedComponent = connect(callback) (App);
export default connectedComponent;
