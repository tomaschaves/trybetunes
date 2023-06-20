import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    search: '',
    success: false,
    artistName: '',
    albums: [],
    firstSearch: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;

    this.setState(
      { search: value },
      () => {
        this.handleLength();
      },
    );
  };

  handleLength = () => {
    const { search } = this.state;
    const minimum = 2;
    if (search.length >= minimum) {
      this.setState({
        isSearchButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchButtonDisabled: true,
      });
    }
  };

  handleSearch = async (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({
      search: '',
      firstSearch: false,
    });

    const results = await searchAlbumsAPI(search);
    this.setState({
      success: true,
      artistName: search,
      albums: results,
      isSearchButtonDisabled: true,
    });
  };

  render() {
    const {
      isSearchButtonDisabled,
      search,
      success,
      artistName,
      albums,
      firstSearch } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <div>
          <form>
            Search:
            <input
              type="text"
              name="search"
              id="search"
              value={ search }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ this.handleSearch }
            >
              Search
            </button>
          </form>
          <h1>
            {`Search results for: ${artistName}` }
          </h1>
          { ((!success) && (firstSearch === false))
            && <h2>No results for your search</h2> }
          <div className="albums">
            { success && albums.map((album) => (
              <div className="albumInfo" key={ album.collectionId }>
                {`${album.collectionName}`}
                <br />
                {`${album.artistName}`}
                <br />
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionName }
                  className="album-image"
                />
                <br />
                <Link
                  to={ `album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  className="linkToAlbum"
                >
                  Album
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
