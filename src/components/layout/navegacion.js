import React, { Component } from "react";

// importamos link para ruteo
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";

// documentacion
import { PropTypes } from 'prop-types';

class Navegacion extends Component {
    state = {
        usuarioAutenticado: false
    };

    // Recibe los props automaticamente propiedad reemplaza componentWillReceiveProps
    static getDerivedStateFromProps(props, state) {
        // console.log(props)
        const { auth } = props;
        if (auth.uid) {
            return { usuarioAutenticado: true };
        } else {
            return { usuarioAutenticado: false };
        }
    }

    // cerrar la session
    cerrarSession = () => {
        const {firebase} = this.props;
        firebase.logout();
    }

    
    // iniciar sesion
    iniciarSession = () => {
        
    }

    render() {
        const { usuarioAutenticado } = this.state;
        // Extraer los datos del autentificado
        const { auth } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-3">
                    <nav className="navbar navbar-light">
                        <span className="navbar-brand mb-0 h1">
                            Gestión de Biblioteca
                        </span>
                    </nav>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarColor01"
                    >
                        {usuarioAutenticado ? (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/"} className="nav-link">
                                        Libros
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={"/suscriptores"}
                                        className="nav-link"
                                    >
                                        Suscriptores
                                    </Link>
                                </li>
                            </ul>
                        ) : null}
                        {usuarioAutenticado ? (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        {auth.email}
                                                                           </a>
                                </li>
                                <li className="nav-item">
                                <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={this.cerrarSession}
                                        >
                                            Logout
                                        </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={ this.iniciarSession }
                                        >
                                            Login
                                        </button>
                                    </a>
                                </li>
                            </ul>
                        )}
                    </div>
                </nav>
            </div>
        );
    }
}


Navegacion.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(Navegacion);
