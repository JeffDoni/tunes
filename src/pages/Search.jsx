import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  state = {
    searchText: '',
    disableButtonSearch: true,
    album: [],
    failed: true,
    loading: false,
    search: '',
  };

  validateSearch = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { searchText } = this.state;
      const size = 2;
      const limit = searchText.length < size;

      this.setState({
        disableButtonSearch: limit,
      });
    });
  };

  handleClickSearch = () => {
    this.setState(
      { loading: true },
      async () => {
        const { searchText } = this.state;
        const request = await searchAlbumsAPIs(searchText);
        this.setState({
          album: request,
          searchText: '',
          loading: false,
          search: searchText,
        }, () => {
          if (request.length === 0) {
            this.setState({ failed: false });
          }
        });
      },

    );
  };

  render() {
    const { searchText,
      disableButtonSearch,
      album,
      search, loading, failed } = this.state;
    console.log(album);
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="searchText"
            value={ searchText }
            onChange={ this.validateSearch }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ disableButtonSearch }
            onClick={ this.handleClickSearch }
          >
            Pesquisar

          </button>
        </form>
        <div>

          <span>{`Resultado de álbuns de: ${search}`}</span>

          { loading ? (<Carregando />)
            : (album.map((element) => (
              <div key={ element.artistId }>
                <div>
                  <p>{element.artistName}</p>
                  <p>{element.collectionName}</p>
                  <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                </div>
                <Link
                  to={ `/album/${element.collectionId}` }
                  data-testid={ `link-to-album-${element.collectionId}` }
                >
                  Ir para o album
                </Link>
              </div>
            )))}
          {failed ? null : (<p>Nenhum álbum foi encontrado</p>)}
        </div>
      </div>
    );
  }
}

export default Search;
