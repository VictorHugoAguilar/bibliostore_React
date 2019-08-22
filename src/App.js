import React from 'react';
import { Provider } from 'react-redux';

// Importamos los componentes

import Libros from './components/Libros/Libros';
import MostrarLibro from './components/Libros/MostrarLibro';
import EditarLibro from './components/Libros/EditarLibro';
import NuevoLibro from './components/Libros/NuevoLibro';
import PrestamoLibro from './components/Libros/PrestamoLibro';

import  Navegacion            from './components/layout/Navegacion'
import  EditarSuscriptor  from './components/suscriptores/EditarSuscriptor';
import  MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor';
import  NuevoSuscriptor   from './components/suscriptores/NuevoSuscriptor';
import  Suscriptores      from './components/suscriptores/Suscriptores';
import  Login             from './components/auth/Login';

// importamos router desde react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// auth
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth'

// importamos el store
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Navegacion />
          <div className="container">
            <Switch>
              {/* rutas de libros */}
              <Route exact path="/" component={UserIsAuthenticated(Libros)} />
              <Route exact path="/libros/nuevo" component={UserIsAuthenticated(NuevoLibro)} />
              <Route exact path="/libros/mostrar/:id" component={UserIsAuthenticated(MostrarLibro)} />
              <Route exact path="/libros/editar/:id" component={UserIsAuthenticated(EditarLibro)} />
              <Route exact path="/libros/prestamo/:id" component={UserIsAuthenticated(PrestamoLibro)} />
              {/* rutas de suscriptores */}
              <Route exact path="/suscriptores" component={UserIsAuthenticated(Suscriptores)} />
              <Route exact path="/suscriptores/nuevo" component={UserIsAuthenticated(NuevoSuscriptor)} />
              <Route exact path="/suscriptores/mostrar/:id" component={UserIsAuthenticated(MostrarSuscriptor)} />
              <Route exact path="/suscriptores/editar/:id" component={UserIsAuthenticated(EditarSuscriptor)} />

              <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            </Switch>
          </div>
      </Router>
    </Provider>
  );
};

export default App;