import React from 'react';
import { Provider } from 'react-redux';

// Importamos los componentes
import  Navegacion            from './components/layout/navegacion'
import  EditarSuscriptor  from './components/suscriptores/editarSuscriptor';
import  MostrarSuscriptor from './components/suscriptores/mostrarSuscriptor';
import  NuevoSuscriptor   from './components/suscriptores/nuevoSuscriptor';
import  Suscriptores      from './components/suscriptores/suscriptores';

// importamos router desde react-router-dom
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// importamos el store
import store from './store';

function App() {
  return (
    <Provider store={store} >
      <Router>
        <Navegacion />
          <div className="container">
            <Switch>
              <Route exact path="/suscriptores" component={Suscriptores} />
              <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor} />
              <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor} />
              <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor} />
            </Switch>
          </div>
      </Router>
    </Provider>
  );
};

export default App;