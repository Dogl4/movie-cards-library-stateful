import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    const { movies } = this.props;
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleStateFilter = this.handleStateFilter.bind(this);
  }

  handleStateFilter(type, target) {
    const { movies } = this.props;
    const { value, checked } = target;
    let filteredMovies = movies;
    if (type === 'checkbox') {
      const current = movies.filter(({ bookmarked }) => bookmarked);
      filteredMovies = checked ? current : movies;
    } else if (value.length > 0) {
      if (type === 'text') {
        filteredMovies = movies.filter((movie) => movie
          .title.toLowerCase().includes(value.toLowerCase()));
      } else {
        const current = movies.filter((movie) => movie.genre === value);
        filteredMovies = value !== '' ? current : movies;
      }
    }
    return filteredMovies;
  }

  handleChange(event) {
    const { target } = event;
    const { name, value, checked, type } = target;
    const filteredMovies = this.handleStateFilter(type, target);
    this.setState({
      [name]: (type === 'checkbox' ? checked : value),
      movies: filteredMovies,
    });
  }

  render() {
    const { searchText, selectedGenre, bookmarkedOnly, movies } = this.state;
    return (
      <div>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleChange }
        />
        <MovieList movies={ movies } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf.isRequired,
};

export default MovieLibrary;
