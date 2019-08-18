import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

class NuevoSuscriptor extends Component {
    state = {
        nombre: "",
        apellido: "",
        carrera: "",
        codigo: ""
    };

    // Agrega un nuevo suscriptor a la base de datos
    agregarSuscriptor = e => {
        e.preventDefault();

        // extraer los valores del state
        const nuevoSuscriptor = { ...this.state };
        // console.log(nuevoSuscriptor);

        // extraer firestore de props
        //console.log(this.props.firestore)
        const { firestore, history } = this.props;

        // guardarlo en la base de datos
        firestore
            .add(
                {
                    collection: "suscriptores"
                },
                nuevoSuscriptor
            )
            .then(respuesta => {
                // console.log(respuesta);
                Swal.fire(
                    "Añadido!",
                    "Se ha añadido correctamente!",
                    "success"
                );
                history.push("/suscriptores");
            })
            .catch(error => {
                Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "No se ha podido insertar!",
                    footer: error
                });
            });
    };

    // extrae los valores de los input y los coloca en el state
    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    static propTypes: { firestore: any };

    render() {
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/suscriptores"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left" /> Volver al
                        listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus" /> Nuevo Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-2">
                            <form onSubmit={this.agregarSuscriptor}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Apellido: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="apellido"
                                        placeholder="Apellido del suscriptor"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.apellido}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Carrera: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="carrera"
                                        placeholder="Carrera del suscriptor"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.carrera}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Codigo: </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="codigo"
                                        placeholder="Codigo del suscriptor"
                                        required
                                        onChange={this.leerDato}
                                        value={this.state.codigo}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Crear suscriptor"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NuevoSuscriptor);
