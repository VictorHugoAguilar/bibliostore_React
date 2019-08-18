import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

class NuevoLibro extends Component {
    // creamos el state
    state = {
        titulo: "",
        ISBN: "",
        editorial: "",
        existencias: 0
    };

    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <Link to="/" className="btn btn-secondary">
                            <i className="fas fa-arrow-circle-left" />
                            Volver al listado
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center ">
                    <div className="col-md-8 mt-2">
                        <form>
                            <div className="form-group">
                                <label>Titulo: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="titulo"
                                    placeholder="Titulo o Nombre de Libro"
                                    required
                                    value={this.state.titulo}
                                    onChange={this.leerDato}
                                />
                            </div>
                            <div className="form-group">
                                <label>ISBN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="ISBN de Libro"
                                    required
                                    value={this.state.ISBN}
                                    onChange={this.leerDato}
                                />
                            </div>
                            <div className="form-group">
                                <label>Editorial: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial de Libro"
                                    required
                                    value={this.state.editorial}
                                    onChange={this.leerDato}
                                />
                            </div>
                            <div className="form-group">
                                <label>Existencia: </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="existencia"
                                    placeholder="Cantidad en Existencia"
                                    required
                                    value={this.state.existencia}
                                    onChange={this.leerDato}
                                />
                            </div>
                            <input
                                type="submit"
                                className="btn btn-success btn-block mt-4"
                                value="Crear Libro"
                            />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoLibro);
