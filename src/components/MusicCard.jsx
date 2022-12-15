import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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
    console.log(checked);
    this.setState({ loading: true });
    if (checked) {
      await addSong(musics);
    } else {
      await removeSong(musics);
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
    const { musics: { trackId, trackName, previewUrl }, handleClick } = this.props;
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
        <label htmlFor={ trackId }>
          {' '}
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="favorites"
            id={ trackId }
            onChange={ this.hadleChange }
            onClick={ handleClick }
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
  }),
  handleClick: PropTypes.func.isRequired,
}.isRequired;

export default MusicCard;
