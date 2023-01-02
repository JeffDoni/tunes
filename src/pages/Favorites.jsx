import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends React.Component {
  state = {
    loading: false,
    favorite: [],
  };

  componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const songs = await getFavoriteSongs();
      this.setState({
        favorite: songs,
        loading: false,
      });
    });
  }

  handleClick = ({ target: { checked, id } }) => {
    console.log('deu certo', checked, id);
    const { favorite } = this.state;
    if (!checked) {
      this.setState({
        loading: true,

      }, async () => {
        const remove = favorite.find((music) => Number(music.trackId) === Number(id));
        await removeSong(remove);
        const newmusic = await getFavoriteSongs();
        this.setState({
          favorite: newmusic,
          loading: false,
        });
      });
    }
  };

  render() {
    const { loading, favorite } = this.state;
    return (
      <div data-testid="page-favorites" className="container-favorites">
        <Header />
        <div className="music">
          <div className="title">
            <p>Músicas Favoritas</p>
          </div>
          <div className="container-faixas">
            {loading ? (<Carregando />
            ) : (
              favorite.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  musics={ music }
                  handleClick={ this.handleClick }

                />
              ))
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default Favorites;
