import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import '../styles/Album.css';

class Album extends React.Component {
    state = {
        selectAlbum: undefined,
        musics: undefined,

    };

    async componentDidMount() {
        const { match: { params: { id } } } = this.props;
        const music = await getMusics(id);
        this.setState({
            selectAlbum: music[0],
            musics: music.slice(1, music.length),
        });
    }

    render() {
        const { selectAlbum, musics } = this.state;
        return (
            <div data-testid="page-album" className="album">
                <Header />
                <div className="container-album">
                    <div className="info-album">
                        <div>
                            <img
                                src={ selectAlbum ? `${selectAlbum.artworkUrl100}` : 'NOT FOUND' }
                                alt="Album"
                            />
                        </div>
                        <p data-testid="artist-name">
                            {selectAlbum ? `Artista: ${selectAlbum.artistName}` : 'VAZIO'}
                        </p>
                        <p data-testid="album-name">
                            {selectAlbum ? `Albúm: ${selectAlbum.collectionName}` : 'VAZIO'}
                        </p>
                    </div>
                    <div className="music">

                        {musics ? musics.map((music) => (

                            <MusicCard
                                key={ music.trackid }
                                musics={ music }
                            />

                        ))
                            : null}
                    </div>
                </div>
            </div>
        );
    }
}

Album.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default Album;
