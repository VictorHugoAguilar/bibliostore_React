import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const Suscriptores = ({ suscriptores, firestore }) => {
    // console.log(suscriptores);
    // console.log(firestore);

    if (!suscriptores) return <Spinner />;

    // eliminar suscriptores
    const eliminarSuscriptor = id => {
        // console.log('eliminando', id);

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
                firestore
                    .delete({
                        collection: "suscriptores",
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
            <div className="col-md-12 mb-4">
                <Link to="/suscriptores/nuevo" className="btn btn-success">
                    <i className="fas fa-plus" /> Agregar nuevo Suscriptor
                </Link>
            </div>
            <div className="col-md-8">
                <h2>
                    <i className="fas fa-users" /> Suscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th className="text-center">Nombre</th>
                        <th className="text-center">Carrera</th>
                        <th className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {suscriptores.map(suscriptor => (
                        <tr key={suscriptor.id}>
                            <td>
                                {suscriptor.nombre} {suscriptor.apellido}
                            </td>
                            <td>{suscriptor.carrera}</td>
                            <td className="text-right">
                                <Link
                                    to={`/suscriptores/mostrar/${
                                        suscriptor.id
                                    }`}
                                    className="btn btn-info "
                                >
                                    <i className="fas fa-angle-double-right" />{" "}
                                    Mas información
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-danger ml-2"
                                    onClick={() =>
                                        eliminarSuscriptor(suscriptor.id)
                                    }
                                >
                                    <i className="fas fa-trash-alt" /> Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Suscriptores.propTypes = {
    firestore: PropTypes.object.isRequired,
    suscriptores: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: "suscriptores" }]),
    connect((state, props) => ({
        suscriptores: state.firestore.ordered.suscriptores
    }))
)(Suscriptores);
