import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import FichaSuscriptor from "../suscriptores/FichaSuscriptor";

// REDUX ACTION
import { buscarUsuario } from "../../actions/buscarUsuarioActions";

class PrestamoLibro extends Component {
    state = {
        busqueda: "",
        noResultados: false
    };

    // buscar alumno por código
    buscarAlumno = e => {
        e.preventDefault();

        // obtener el valor a buscar
        const { busqueda } = this.state;

        // extraer firestore
        const { firestore, buscarUsuario } = this.props;

        // hacer la consulta
        const coleccion = firestore.collection("suscriptores");
        const consulta = coleccion.where("codigo", "==", busqueda).get();

        consulta
            .then(respuesta => {
                // console.log(respuesta);
                if (respuesta.empty) {
                    // almacenar en redux un objeto vacio
                    buscarUsuario({});
                    // no hay resultados actualiza el estate

                    this.setState({
                        noResultados: true
                    });
                } else {
                    // si hay resultados
                    const datos = respuesta.docs[0];
                    // console.log(datos.data());

                    // colocar resultado en redux
                    buscarUsuario(datos.data());

                    // hay resultados actualiza el estate
                    this.setState({
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

    // Almacenar los datos del alumno para solicitar el libro
    solicitarPrestamo = () => {
        // console.log("entrando en prestamos")

        const { usuario } = this.props;

        const suscriptor = this.state.resultado;

        // fecha de alta
        usuario.fecha_solicitud = new Date().toLocaleDateString();

        // obtener el libro
        // const libroActualizado = this.props.libro;

        // agregar el suscriptor al libro
        // libroActualizado.prestados.push(usuario);

        // no se pueden mutar los props tomar una copia y crear un arreglo nuevo
        let prestados = [];

        prestados = [...this.props.libro.prestados, usuario];

        // copiar el objeto y agregar los prestados
        const libro = { ...this.props.libro };

        // eliminar los prestado anteriores
        delete libro.prestados;

        // asignar los nuevos
        libro.prestados = prestados;

        // obtener firestore y history de props
        const { firestore, history } = this.props;

        // almacenar en la base de datos
        firestore
            .update(
                {
                    collection: "libros",
                    doc: libro.id
                },
                libro
            )
            .then(respuesta => {
                Swal.fire(
                    "Prestado!",
                    "Se ha prestado correctamente!",
                    "success"
                );
                history.push("/");
            })
            .catch(error => {
                // console.log(error);
                Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "No se ha podido insertar!",
                    footer: error
                });
            });
    };

    render() {
        // extraer libro
        const { libro } = this.props;

        // mostrar el spinner
        if (!libro) return <Spinner />;

        // extraer los datos del alumno
        const { usuario } = this.props;

        let fichaAlumno, btnSolicitar;
        if (usuario.nombre) {
            fichaAlumno = <FichaSuscriptor alumno={usuario} />;
            btnSolicitar = (
                <button
                    type="button"
                    className="btn btn-success btn-block"
                    onClick={this.solicitarPrestamo}
                >
                    Solicitar Prestamo
                </button>
            );
        } else {
            fichaAlumno = null;
            btnSolicitar = null;
        }

        // extraemos del state
        const { noResultados } = this.state;

        // Mostrar mensaje de error
        let mensajeResultado = "";
        if (noResultados) {
            mensajeResultado = (
                <div className="alert alert-danger mt-4">
                    <h4 className="text-center">
                        No hay resultados en la busqueda{" "}
                        <i className="fas fa-search" />
                    </h4>
                </div>
            );
        } else {
            mensajeResultado = null;
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
                            {mensajeResultado}
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
    connect(
        ({ firestore: { ordered }, usuario }, props) => ({
            libro: ordered.libro && ordered.libro[0],
            usuario: usuario
        }),
        { buscarUsuario }
    )
)(PrestamoLibro);
