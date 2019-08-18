import React, { Component } from "react";
import { Link } from "react-router-dom";

class PrestamoLibro extends Component {
    state = {};
    render() {
        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left" /> Volver al
                        listado
                    </Link>
                </div>
            </div>
        );
    }
}

export default PrestamoLibro;
