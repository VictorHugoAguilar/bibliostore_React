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
        existencias: ""
    };

    // guardar el libro en la base de datos
    agregarLibro = e => {
        e.preventDefault();

        // tomar una copia del state
        const nuevoLibro = this.state;

        // agregar un arreglo de interesados
        nuevoLibro.prestados = [];

        // extraer firestore con sus métodos
        const { firestore, history } = this.props;

        // añadirlo a la base de datos y redireccionar
        firestore
            .add({ collection: "libros" }, nuevoLibro)
            .then(respuesta => {
                // console.log(respuesta);
                Swal.fire(
                    "Añadido!",
                    "Se ha añadido correctamente!",
                    "success"
                );
                history.push("/");
            })
            .catch(error =>
                Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "No se ha podido insertar!",
                    footer: error
                })
            );
    };

    // almacena lo que le usuario escribe en el state
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
                        <form onSubmit={this.agregarLibro}>
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
                                    name="existencias"
                                    placeholder="Cantidad en Existencia"
                                    required
                                    value={this.state.existencias}
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
