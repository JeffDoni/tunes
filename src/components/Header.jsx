import React from 'react';
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
        <p data-testid="header-user-name">{id.name }</p>
        <span>{loading && <Carregando />}</span>
      </header>
    );
  }
}

export default Header;
