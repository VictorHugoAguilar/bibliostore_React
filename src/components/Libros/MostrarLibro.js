import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import PropTypes from "prop-types";

class MostrarLibro extends Component {
    state = {};
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
