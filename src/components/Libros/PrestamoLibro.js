import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import FichaSuscriptor from "../suscriptores/FichaSuscriptor";

class PrestamoLibro extends Component {
    state = {
        busqueda: "",
        resultado: {},
        noResultados: false
    };

    // buscar alumno por código
    buscarAlumno = e => {
        e.preventDefault();

        // obtener el valor a buscar
        const { busqueda } = this.state;

        // extraer firestore
        const { firestore } = this.props;

        // hacer la consulta
        const coleccion = firestore.collection("suscriptores");
        const consulta = coleccion.where("codigo", "==", busqueda).get();

        consulta
            .then(respuesta => {
                // console.log(respuesta);
                if (respuesta.empty) {
                    // no hay resultados
                    this.setState({
                        noResultados: true,
                        resultado: {}
                    });
                } else {
                    // si hay resultados
                    const datos = respuesta.docs[0];
                    // console.log(datos.data());
                    this.setState({
                        resultado: datos.data(),
                        noResultados: false
                    });
                }
            })
            .catch(error => {
                Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "No se ha podido insertar!",
                    footer: error
                });
            });

        console.log(consulta);
        // leer los resultados
    };

    // Almacenar el codigo en el state

    leerDato = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        // extraer libro
        const { libro } = this.props;

        // mostrar el spinner
        if (!libro) return <Spinner />;

        // extraer los datos del alumno
        const { noResultado, resultado } = this.state;

        let fichaAlumno, btnSolicitar;
        if (resultado.nombre) {
            fichaAlumno = <FichaSuscriptor alumno={resultado} />;
            btnSolicitar = (
                <button
                    type="button"
                    className="btn btn-success btn-block"
                    onclick={this.solicitarPrestamo}
                >
                    Solicitar Prestamo
                </button>
            );
        } else {
            fichaAlumno = null;
            btnSolicitar = null;
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left" /> Volver al
                        listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book" /> Prestar Libro:{" "}
                        {libro.titulo}
                    </h2>

                    <div className="row justify-content-left mt-3">
                        <div className="col-md-8">
                            <form onSubmit={this.buscarAlumno}>
                                <legend className="color-primary text-center">
                                    Buscar suscriptor por código
                                </legend>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="busqueda"
                                        className="form-control"
                                        onChange={this.leerDato}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Buscar alumno"
                                />
                            </form>
                            {/* Muestra la ficha del alumno y el boton para solicitar el préstamo */}
                            {fichaAlumno}
                            {btnSolicitar}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PrestamoLibro.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {
            collection: "libros",
            storeAs: "libro",
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        libro: ordered.libro && ordered.libro[0]
    }))
)(PrestamoLibro);
