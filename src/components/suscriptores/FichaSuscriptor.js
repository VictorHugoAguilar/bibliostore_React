import React from "react";

const FichaSuscriptor = ({ alumno }) => {
    return (
        <div className="card my-3">
            <h3 className="card-header bg-primary text-white">
                {" "}
                Datos del solicitante
            </h3>
            <div className="card-body">
                <p>
                    <span className="font-weight-bold">Codigo: </span>
                    {alumno.codigo}
                </p>
                <p>
                    <span className="font-weight-bold">Nombre: </span>
                    {alumno.nombre} {' '}{alumno.apellido}
                </p>
                <p>
                    <span className="font-weight-bold">Carrera: </span>
                    {alumno.carrera}
                </p>
            </div>
        </div>
    );
};

export default FichaSuscriptor;
