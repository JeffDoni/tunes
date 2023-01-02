import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';
import ImgProfile from '../image/profile.png';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    infoname: '',
    infoemail: '',
    infodescription: '',
    infoimage: '',
    buttonDisable: true,
  };

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const request = await getUser();
      this.setState({
        loading: false,
        infoname: request.name,
        infoemail: request.email,
        infodescription: request.description,
        infoimage: request.image,
      });
    });
  }

  handleChange = async ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.validationinfo);
  };

  validationinfo = () => {
    const { infodescription, infoemail, infoimage, infoname } = this.state;
    const email = infoemail.length > 0;
    const image = infoimage.length > 0;
    const nome = infoname.length > 0;
    const description = infodescription.length;
    this.setState({
      buttonDisable: !(email && image && nome && description),
    });
  };

  handleClick = () => {
    const { history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const { infoname, infoimage, infodescription, infoemail } = this.state;
        await updateUser({
          name: infoname,
          email: infoemail,
          image: infoimage,
          description: infodescription });
        return history.push('/profile');
      },
    );
  };

  render() {
    const { loading,
      infoname,
      infoemail,
      infodescription,
      infoimage,
      buttonDisable,
    } = this.state;
    return (
      <div data-testid="page-profile-edit" className="profile">
        <Header />
        {loading && <Carregando />}
        <form className="container">
          <span>Nome</span>
          <input
            type="text"
            data-testid="edit-input-name"
            value={ infoname }
            id="infoname"
            name="infoname"
            onChange={ this.handleChange }
          />
          <span>Email</span>
          <input
            type="email"
            data-testid="edit-input-email"
            value={ infoemail }
            id="infoemail"
            name="infoemail"
            onChange={ this.handleChange }
          />
          <span>Descrição</span>
          <textarea
            cols="50"
            rows="10"
            data-testid="edit-input-description"
            value={ infodescription }
            id="infodescription"
            name="infodescription"
            onChange={ this.handleChange }
            placeholder="Insira sua descrição"
          />
          <input
            type="image"
            src={ infoimage || ImgProfile }
            alt={ infoname }
            className="profile-image"
          />
          <span>Foto:</span>
          <input
            type="text"
            data-testid="edit-input-image"
            value={ infoimage }
            id="infoimage"
            name="infoimage"
            onChange={ this.handleChange }
            placeholder="Insira um link de imagem"
          />
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
            className="profile-btn"
          >
            Editar perfil

          </button>
        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
