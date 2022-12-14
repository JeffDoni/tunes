import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';

class Header extends React.Component {
  state = {
    loading: true,
    id: {},
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const request = await getUser();
      this.setState({
        loading: false,
        id: request,
      });
    });
  }

  render() {
    const { loading, id } = this.state;
    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">Busca</Link>
          </li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Profile</Link></li>

        </ul>
        <p data-testid="header-user-name">{id.name }</p>
        <span>{loading && <Carregando />}</span>
      </header>
    );
  }
}

export default Header;
