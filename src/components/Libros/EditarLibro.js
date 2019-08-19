import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

class EditarLibro extends Component {
    // refs
    tituloInput = React.createRef();
    ISBNInput = React.createRef();
    editorialInput = React.createRef();
    existenciasInput = React.createRef();

    // Actualizar libro en firestore
    actualizarLibro = e => {
        e.preventDefault();

        // construir nuevo objeto
        const libroActualizado = {
            titulo: this.tituloInput.current.value,
            ISBN: this.ISBNInput.current.value,
            editorial: this.editorialInput.current.value,
            existencias: this.existenciasInput.current.value
        };
        // console.log(libroActualizado);

        // leer firestores y history
        const { firestore, history, libro } = this.props;

        // actualizar en firestore
        firestore
            .update(
                {
                    collection: "libros",
                    doc: libro.id
                },
                libroActualizado
            )
            .then(respuesta => {
                // console.log(respuesta);
                Swal.fire(
                    "Modificado!",
                    "Se ha modificado correctamente!",
                    "success"
                );
                history.push("/");
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

    render() {
        // obtener el libro
        const { libro } = this.props;

        if (!libro) return <Spinner />;

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={"/"} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left" /> Volver al
                        listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book" /> Editar Libro
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-2">
                            <form onSubmit={this.actualizarLibro}>
                                <div className="form-group">
                                    <label>Titulo: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo o Nombre de Libro"
                                        required
                                        defaultValue={libro.titulo}
                                        ref={this.tituloInput}
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
                                        defaultValue={libro.ISBN}
                                        ref={this.ISBNInput}
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
                                        defaultValue={libro.editorial}
                                        ref={this.editorialInput}
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
                                        defaultValue={libro.existencias}
                                        ref={this.existenciasInput}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block mt-4"
                                    value="Editar Libro"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarLibro.propTypes = {
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
)(EditarLibro);
