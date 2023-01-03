import React from 'react';
import image from '../image/carregando.png';

class Carregando extends React.Component {
    render() {
        return (
            <div>
                <img src={ image } alt="carregando" />
                <p>Carregando...</p>
            </div>
        );
    }
}

export default Carregando;
