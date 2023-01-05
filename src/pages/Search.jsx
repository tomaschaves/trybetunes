import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    search: '',
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
      console.log('deu');
      this.setState({
        isSearchButtonDisabled: false,
      });
    }
  };

  render() {
    const { isSearchButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        Search
        <div data-testid="page-login">
          <form>
            <input
              type="text"
              name="search"
              id="search"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
