import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
      <div data-testid="page-profile">
        <Header />
        {loading && <Carregando />}
        <Link to="/profile/edit">Editar perfil</Link>
        <p>{ info.name }</p>
        <p>{info.email }</p>
        <p>{info.description}</p>
        <img src={ info.image } alt={ info.name } data-testid="profile-image" />
      </div>
    );
  }
}

export default Profile;
