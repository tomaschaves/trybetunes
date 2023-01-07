import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
        Search
        <div>
          <form>
            <input
              type="text"
              name="search"
              id="search"
              value={ search }
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
              onClick={ this.handleSearch }
            >
              Pesquisar
            </button>
          </form>
          <h1>
            {`Resultado de álbuns de: ${artistName}` }
          </h1>
          { ((!success) && (firstSearch === false))
            && <h2>Nenhum álbum foi encontrado</h2> }
          { success && albums.map((album) => (
            <div key={ album.collectionId }>
              {`Nome do artista: ${album.artistName}`}
              <br />
              {`Álbum: ${album.collectionName}`}
              <br />
              Capa:
              <br />
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
              />
              <br />
              <Link
                to={ `album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Album
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
