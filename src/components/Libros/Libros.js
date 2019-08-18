import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Libros = ({ libros, firestore }) => {
    if (!libros) return <Spinner />;
    // console.log(libros);

    const eliminarLibro = id => {
        // console.log(id);

        Swal.fire({
            title: "Estás seguro?",
            text: "Las eliminaciones no se pueden revertir!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminarlo",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                // eliminar libro de firestore
                firestore
                .delete({
                    collection: "libros",
                    doc: id
                })
                .then(resultado => {
                    // console.log(resultado);
                    Swal.fire(
                        "Eliminado!",
                        "Suscriptor eliminado con éxito.",
                        "success"
                    );
                })
                .catch(error => {
                    // console.log(error);
                    Swal.fire({
                        type: "error",
                        title: "Oops...",
                        text: error
                    });
                });
            }
        });
    };

    return (
        <div className="row">
            <div className="col-12 mb-4">
                <Link to="/libros/nuevo" className="btn btn-secondary">
                    <i className="fas fa-plus" /> Nuevo Libro
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-book" /> Libros
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Título</th>
                        <th>ISBN</th>
                        <th>Editorial</th>
                        <th>Existencias</th>
                        <th>Disponibilidad</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(libro => (
                        <tr key={libro.id}>
                            <td>{libro.titulo}</td>
                            <td>{libro.ISBN}</td>
                            <td>{libro.editorial}</td>
                            <td>{libro.existencias}</td>
                            <td>
                                {libro.existencias - libro.prestados.length}
                            </td>
                            <td className="text-right">
                                <Link
                                    to={`/libros/mostrar/${libro.id}`}
                                    className="btn btn-info"
                                >
                                    <i className="fas fa-angle-double-right" />{" "}
                                    Más Información
                                </Link>
                                <button
                                    className="btn btn-danger ml-2"
                                    type="button"
                                    onClick={() => eliminarLibro(libro.id)}
                                >
                                    <i className="fas fa-trash" /> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Libros.propTypes = {
    firestore: PropTypes.object.isRequired,
    libros: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: "libros" }]),
    connect((state, props) => ({
        libros: state.firestore.ordered.libros
    }))
)(Libros);
