import React, { Component } from 'react';

import firebase from '../Initializers/firebase';

import Header from '../Components/Header';

import { connect } from 'react-redux';

class User extends Component {
  constructor(props){
      super(props)
      this.state={
          user: false
      }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          // console.log(user.providerData[0])
            //Si hay sesión
            this.setState({
                user:true
            })
        }else{
            //Si no hay sesión
            this.setState({
                user:false
            })
        }
    })
}

  login(){
    let provider = new firebase.auth.GoogleAuthProvider();//una nueva instacia de google
    firebase.auth().signInWithPopup(provider)//el metodo auth() llamamos el submetodo de ventana pasandole a google
    .then(function(result) {//esto es una promesa y que me retornará un resultado
      if(result.providerData[0].email.substr(-13)==="tecsup.edu.pe"){
        console.log('exito')
      }else{
        alert("la cuenta no pertenece al dominio de la institución")
        firebase.auth().signOut()
      }
    })
    .catch(err => console.log(err))//si el usuario no permite su autenticación
  }

  logout(){
    firebase.auth().signOut();
    window.location.reload();
}

  render() {
    console.log(this.props.user)
    return (
      <div>{
      <Header 
      onDrawerToggle={this.props.onDrawerToggle}
      login={this.login}
      logout={this.logout}
      user={this.state.user}
      photo={this.props.user.photoURL}
      name={this.props.user.displayName}
      />
      }
      </div>
    )
  }
}

const mapStateToProps = state =>{
  return {
    user: state.user
  }
}

const wrapper = connect(mapStateToProps)//permite agregar este "estado" a una emvoltura
const component = wrapper(User)//envolvemos el actual componente para recibir otro con todo y props 

export default component;
