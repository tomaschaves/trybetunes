import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Favorites extends Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
    // isLoadingMusicCard: false,
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

  // handleClickMusicCard = async () => {
  //   const { isLoadingMusicCard } = this.state;
  //   const songs = await getFavoriteSongs();
  //   this.setState({
  //     favoriteSongs: songs,
  //     isLoadingMusicCard: !isLoadingMusicCard,
  //   });
  // };

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
                // handleClickMusicCard={ this.handleClickMusicCard() }
              />
            ))
        }
      </div>
    );
  }
}

export default Favorites;
