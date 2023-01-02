import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../styles/Login.css';
import img from '../image/logo.png';

class Login extends React.Component {
  state = {
    loginname: '',
    disableButton: true,
    loading: false,
  };

  validateInfo = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { loginname } = this.state;
      const size = 3;
      const limit = loginname.length < size;

      this.setState({
        disableButton: limit,
      });
    });
  };

  handleClick = () => {
    const { history } = this.props;
    this.setState(
      { loading: true },
      async () => {
        const { loginname } = this.state;
        await createUser({ name: loginname });
        return history.push('/search');
      },
    );
  };

  render() {
    const { loginname, disableButton, loading } = this.state;
    if (loading) return <Carregando />;

    return (
      <div data-testid="page-login" className="login">
        <img src={ img } alt="logo" />
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            value={ loginname }
            onChange={ this.validateInfo }
            name="loginname"
          />
          <button
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ this.handleClick }
            type="button"
          >
            Entrar

          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
