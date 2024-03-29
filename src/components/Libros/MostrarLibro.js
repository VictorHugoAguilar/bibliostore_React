import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class MostrarLibro extends Component {
    devolverLibro = id => {
        // console.log(id);
        // extraer firestore
        const { firestore, history } = this.props;

        // copia del libro
        const libroActualizado = { ...this.props.libro };

        // eliminar la persona que realiza la devolucion de prestados
        const prestados = libroActualizado.prestados.filter(
            elemento => elemento.codigo !== id
        );

        libroActualizado.prestados = prestados;

        // actualizar en firestore
        firestore
            .update(
                {
                    collection: "libros",
                    doc: libroActualizado.id
                },
                libroActualizado
            )
            .then(respuesta => {
                // console.log(respuesta);
                // console.log("id" + libroActualizado.id)
                Swal.fire(
                    "Devuelto!",
                    "Se ha devuelto correctamente!",
                    "success"
                );
                history.push(`/libros/mostrar/${libroActualizado.id}`);
            })
            .catch(error => {
                // console.error(error)
                Swal.fire({
                    type: "error",
                    title: "Oops...",
                    text: "No se ha podido insertar!",
                    footer: error
                });
            });
    };

    render() {
        // extraer el libro
        const { libro } = this.props;

        if (!libro) return <Spinner />;

        // boton para solicitar un libro
        let btnPrestamo = null;

        if (libro.existencias - libro.prestados.length > 0) {
            btnPrestamo = (
                <Link
                    to={`/libros/prestamo/${libro.id}`}
                    className="btn btn-primary my-3"
                >
                    Solicitar préstamo
                </Link>
            );
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left" /> Volver al
                        listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link
                        to={`/libros/editar/${libro.id}`}
                        className="btn btn-success float-right"
                    >
                        <i className="fas fa-pencil-alt" /> Editar libro
                    </Link>
                </div>
                <hr className="mx-5 w-100" />
                <div className="col-12">
                    <h2 className="mb-4">{libro.titulo}</h2>
                    <p>
                        <span className="font-weight-bold">ISBN: </span>
                        {libro.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">Editorial: </span>
                        {libro.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">Existencias: </span>
                        {libro.existencias}
                    </p>
                    <p>
                        <span className="font-weight-bold">Disponibles: </span>
                        {libro.existencias - libro.prestados.length}
                    </p>
                    {/* Boton para solicitar prestamos si hay disponible  */}
                    {btnPrestamo}

                    {/* Mostrar las personas que tengan el libro */}
                    <h3 className="my-2">Libros presatados a: </h3>
                    {libro.prestados.map(prestado => (
                        <div key={prestado.codigo} className="card my-2">
                            <h4 className="card-header">
                                {prestado.nombre} {prestado.apellido}
                            </h4>
                            <div className="card-body">
                                <p>
                                    <span className="font-weight-bold">
                                        Código:{" "}
                                    </span>
                                    {prestado.codigo}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Carrera:{" "}
                                    </span>
                                    {prestado.carrera}
                                </p>
                                <p>
                                    <span className="font-weight-bold">
                                        Fecha Solicitud:{" "}
                                    </span>
                                    {prestado.fecha_solicitud}
                                </p>
                            </div>
                            <div className="card-footer">
                                <button
                                    type="button"
                                    className="btn btn-info font-weight-bold"
                                    onClick={() =>
                                        this.devolverLibro(prestado.codigo)
                                    }
                                >
                                    Realizar devolución
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

MostrarLibro.propTypes = {
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
)(MostrarLibro);
