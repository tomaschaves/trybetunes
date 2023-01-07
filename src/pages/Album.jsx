import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    albumName: '',
    songs: [],
  };

  componentDidMount() {
    this.fetchTracks();
  }

  fetchTracks = async () => {
    const { match: { params: { id } } } = this.props;

    const musics = async () => {
      const album = await getMusics(id);
      return album;
    };

    musics().then((data) => {
      this.setState({
        artist: data[0].artistName,
        songs: data,
        albumName: data[0].collectionName,
      });
    });
  };

  render() {
    const {
      artist,
      songs,
      albumName,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <br />
        <h1 data-testid="album-name">
          { albumName }
        </h1>
        <h2 data-testid="artist-name">
          { `Album de ${artist}` }
        </h2>
        {songs.map((song) => (
          (song.kind === 'song') && (
            <MusicCard
              key={ song.trackName }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          )))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
