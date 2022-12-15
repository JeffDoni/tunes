import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorites: false,
  };

  async componentDidMount() {
    this.setState({
      favorites: await this.recoverSongs(),
    });
  }

  hadleChange = async ({ target: { checked } }) => {
    const { musics } = this.props;
    this.setState({ loading: true });
    if (checked) {
      await addSong(musics);
    }
    this.setState({
      loading: false,
      favorites: checked,
    });
  };

  recoverSongs = async () => {
    const { musics: { trackId } } = this.props;
    const songs = await getFavoriteSongs();
    return songs.map((song) => song.trackId).includes(trackId);
  };

  render() {
    const { musics: { trackId, trackName, previewUrl } } = this.props;
    const { loading, favorites } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <p>{trackId}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoriteid">
          {' '}
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="favoriteid"
            id="favoriteid"
            onChange={ this.hadleChange }
            checked={ favorites }
          />
        </label>
        <div>
          { loading && <Carregando /> }
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
