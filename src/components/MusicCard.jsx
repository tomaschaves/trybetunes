import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  favorite = async () => {
    const { song } = this.props;
    const { isChecked } = this.state;

    if (!isChecked) {
      this.setState({ loading: true }, () => {
        addSong(song).then(() => {
          this.setState({
            loading: false,
            isChecked: true,
          });
        });
      });
    } else {
      this.setState({ loading: true }, () => {
        removeSong(song).then(() => {
          this.setState({
            loading: false,
            isChecked: false,
          });
        });
      });
    }
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
            onClick={ this.favorite }
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
