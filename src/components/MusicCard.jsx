import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favSongs = await getFavoriteSongs();
    const { song } = this.props;

    if (favSongs.some((element) => element.trackId === song.trackId)) {
      this.setState({
        isChecked: true,
        loading: false,
      });
    }
  };

  favorite = async () => {
    const { song } = this.props;
    const { isChecked } = this.state;
    this.setState({
      loading: true,
    });
    if (!isChecked) {
      await addSong(song);
      await this.getFavorites();
    } else {
      removeSong(song);
      await this.getFavorites();
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;

    return (
      <div>
        <h2>
          { trackName }
        </h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          { loading ? 'Carregando...' : 'Favorita'}
          <input
            type="checkbox"
            id={ trackId }
            data-testid={ `checkbox-music-${trackId}` }
            checked={ isChecked }
            onChange={ this.favorite }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  url: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
