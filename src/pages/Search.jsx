import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    searchText: '',
    disableButtonSearch: true,
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

  render() {
    const { searchText, disableButtonSearch } = this.state;
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
          >
            Pesquisar

          </button>
        </form>
      </div>
    );
  }
}

export default Search;
