import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Tecunity from './Containers/TechUnity';
import Acceso from './Containers/Login'
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app'

import axios from 'axios'

import { Provider } from 'react-redux';
import store from './Initializers/Redux/store';
import { setUser, clearUser } from './Initializers/Redux/actions';

firebase.auth().onAuthStateChanged(user => {
    if(user.providerData[0].email.substr(-13)==="tecsup.edu.pe"){
        console.log("exito")
        if(user){
            store.dispatch(setUser(user.providerData[0]))//mando la accion setUser
            console.log(user.providerData[0])
        }else{
            store.dispatch(clearUser(user.providerData[0]))
        }
        let usuario = {
          nombre: user.providerData[0].displayName,
          email: user.providerData[0].email,
          foto: user.providerData[0].photoURL
        }
        axios.post('https://service-tecunity.herokuapp.com/api/participante', usuario)
        .then(res => {
          console.log("e datos agregados")
        })
        .catch(e => {console.log(e.toString())})
        return
      }else if(user.providerData[0].email.substr(-9)==="gmail.com"){
        alert("la cuenta no pertenece al dominio de la institución")
        firebase.auth().signOut()
        window.location.reload()
      }
    if(!user){
      return
    }
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
