import React, { Fragment } from 'react';

// Importamos los componentes
import  EditarSuscriptor  from './components/suscriptores/editarSuscriptor';
import  MostrarSuscriptor  from './components/suscriptores/mostrarSuscriptor';
import  NuevoSuscriptor  from './components/suscriptores/nuevoSuscriptor';
import  Suscriptores  from './components/suscriptores/suscriptores';

// importamos router desde react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Fragment>
    <Router>
      <Switch>
        <Route exact path="/suscriptores" component={Suscriptores}></Route>
        <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor}></Route>
        <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor}></Route>
        <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor}></Route>
      </Switch>
    </Router>
    </Fragment>
  );
}

export default App;