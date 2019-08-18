import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Spinner from "../layout/spinner";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const MostrarSuscriptor = props => {
    const { suscriptor } = props;

    if (!suscriptor) return <Spinner />;

    // console.log(suscriptor);

    return (
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/suscriptores" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left" />
                    Volver al listado
                </Link>
            </div>
            <div className="col-md-6">
                <Link
                    to={`/suscriptores/editar/${suscriptor.id}`}
                    className="btn btn-info float-right"
                >
                    <i className="fas fa-user-edit" /> Editar Suscriptor
                </Link>
            </div>
            <hr className="mx-5 w-100" />
            <div className="col-12">
                <div className="mb-3">
                    <h2>
                        {suscriptor.nombre} {suscriptor.apellido}
                    </h2>
                    <p>
                        <span className="font-weight-bold">Carrera: </span>
                        {suscriptor.carrera}
                    </p>
                    <p>
                        <span className="font-weight-bold">Código: </span>
                        {suscriptor.codigo}
                    </p>
                </div>
            </div>
        </div>
    );
};

MostrarSuscriptor.propTypes = {
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
)(MostrarSuscriptor);
