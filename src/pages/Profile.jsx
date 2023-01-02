import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../styles/Profile.css';
import imgProfile from '../image/profile.png';

class Profile extends React.Component {
  state = {
    info: [],
    loading: true,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const request = await getUser();
      this.setState({
        loading: false,
        info: request,
      });
    });
  }

  render() {
    const { info, loading } = this.state;
    return (
      <div data-testid="page-profile" className="profile">
        <Header />
        <div className="container">
          {loading && <Carregando />}
          <img
            src={ info.image || imgProfile }
            alt={ info.name }
            data-testid="profile-image"
            className="profile-image"
          />
          <div className="profile-info">
            <div className="profile-name">
              <span>Nome</span>
              <p>{ info.name }</p>
            </div>

            <div className="profile-email">
              <span>E-mail</span>
              <p>{info.email }</p>
            </div>

            <div className="profile-description">
              <span>Descrição</span>
              <p>{info.description}</p>
            </div>

            <Link to="/profile/edit" className="profile-btn">Editar perfil</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default Profile;
