import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  componentDidUpdate() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    let songsArray = await getFavoriteSongs();
    if (songsArray.length === 0) {
      songsArray = [];
    }
    this.setState({
      favoriteSongs: songsArray,
      isLoading: true,
    });
    this.setState({
      isLoading: false,
    });
  };

  handleClickMusicCard = async (music) => {
    const { favoriteSongs } = this.state;
    this.setState({
      isLoading: true,
      favoriteSongs: favoriteSongs.filter((song) => song.trackId !== music.trackId),
    });
    await removeSong(music);
    await this.fetchFavoriteSongs();
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        Favorites
        {
          favoriteSongs.length === 0 && <p>Não há favoritos</p>
        }
        {
          isLoading === true ? <Loading />
            : favoriteSongs.map((song) => (
              <MusicCard
                key={ song.trackName }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                trackId={ song.trackId }
                song={ song }
                handleClickMusicCard={ this.handleClickMusicCard }
              />
            ))
        }
      </div>
    );
  }
}

export default Favorites;
