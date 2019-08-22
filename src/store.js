import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/** Custom Reducers */
import buscarUsuarioReducer from './reducers/buscarUsuarioReducers';

// Configurar firestore

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBF5Z6cFmEH0v9nQTxdVTlgDIGgW_b8cIc",
    authDomain: "bibliostore-21680.firebaseapp.com",
    databaseURL: "https://bibliostore-21680.firebaseio.com",
    projectId: "bibliostore-21680",
    storageBucket: "bibliostore-21680.appspot.com",
    messagingSenderId: "605220753301",
    appId: "1:605220753301:web:e1ef8c6421fafc2d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// configuracion de react-redux
const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true
};

// crear el enhacer con compose de redux y firestore
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    usuario: buscarUsuarioReducer
});

// state inicial
const initialState = {};

// crear el store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
