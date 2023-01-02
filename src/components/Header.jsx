import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineStar } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { getUser } from '../services/userAPI';
import Carregando from '../pages/Carregando';
import '../styles/Header.css';
import img from '../image/logo.png';
import imgProfile from '../image/profile.png';

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
      <header data-testid="header-component" className="header">
        <img src={ img } alt="logo" />
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            <BiSearchAlt />
            Busca
          </Link>

          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            <AiOutlineStar />
            Favoritas

          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            <CgProfile />
            Profile

          </Link>

        </nav>
        <div className="info-user">

          <img src={ id.image || imgProfile } alt={ id.name } className="image-profile" />
          <p data-testid="header-user-name">{id.name }</p>
          <span>{loading && <Carregando />}</span>

        </div>
      </header>
    );
  }
}

export default Header;
