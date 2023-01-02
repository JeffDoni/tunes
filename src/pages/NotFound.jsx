import React from 'react';
import '../styles/Notfound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="notfound">
        <p>Ops!</p>
        <span>
          {' '}
          A página que você
          {' '}
          <br />
          está procurando
          <br />
          não foi encontrada

        </span>
      </div>
    );
  }
}

export default NotFound;
