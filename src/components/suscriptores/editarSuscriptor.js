import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

class EditarSuscriptor extends Component {
    // Crear refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    codigoInput = React.createRef();
    carreraInput = React.createRef();

    // edita el suscriptor en la bd
    editarSuscriptor = e => {
        e.preventDefault();

        // crear el objeto que va a actualizar
        const suscriptorActualizado = {
            nombre: this.nombreInput.current.value,
            apellido: this.apellidoInput.current.value,
            codigo: this.codigoInput.current.value,
            carrera: this.carreraInput.current.value
        };
        console.log(suscriptorActualizado);

        //extraer firestore y history de props
        const { suscriptor, firestore, history } = this.props;

        // alamcenar en la base de datos con firestore
        firestore
            .update(
                {
                    collection: "suscriptores",
                    doc: suscriptor.id
                },
                suscriptorActualizado
            )
            .then(respuesta => {
                // console.log(respuesta);
                Swal.fire(
                    "Modificado!",
                    "Se ha modificado correctamente!",
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

    render() {
        const { suscriptor } = this.props;

        if (!suscriptor) return <Spinner />;

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
                        <i className="fas fa-user-edit" /> Editar Suscriptor
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-2">
                            <form onSubmit={this.editarSuscriptor}>
                                <div className="form-group">
                                    <label>Nombre: </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del suscriptor"
                                        required
                                        ref={this.nombreInput}
                                        defaultValue={suscriptor.nombre}
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
                                        ref={this.apellidoInput}
                                        defaultValue={suscriptor.apellido}
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
                                        ref={this.carreraInput}
                                        defaultValue={suscriptor.carrera}
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
                                        ref={this.codigoInput}
                                        defaultValue={suscriptor.codigo}
                                    />
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Editar suscriptor"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {
            collection: "suscriptores",
            storeAs: "suscriptor",
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(EditarSuscriptor);
