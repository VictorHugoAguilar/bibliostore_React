import React, { Component } from "react";
import { firebaseConnect } from "react-redux-firebase";
import { PropTypes } from "prop-types";

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    // Almacena lo que el usuario escribe en el state
    leerDatos = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    // Iniciar Session en firebase
    iniciarSession = e => {
        e.preventDefault();

        // console.log(this.props.firebase);

        // extraer firebase
        const { history, firebase } = this.props;

        // extraer el state
        const { email, password } = this.state;

        //authenticar el usuario
        firebase
            .login({
                email: email,
                password: password
            })
            .then(respuesta => {
                console.log(respuesta);
                history.push("/");
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-4 mt-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock" /> Iniciar Sesión
                            </h2>
                            <form onSubmit={this.iniciarSession}>
                                <div className="form-group">
                                    <label>Email: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password: </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.leerDatos}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    value="Iniciar Sesión"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
