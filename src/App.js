import React, { Component, Fragment } from 'react';
import Tecunity from './Containers/TechUnity';
import Acceso from './Containers/Login'
import firebase from 'firebase/app'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      acceso: false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
        if(user){
          // console.log(user.providerData[0])
            //Si hay sesión
            this.setState({
                acceso: true
            })
        }else{
            //Si no hay sesión
            this.setState({
                acceso: false
            })
        }
    })
  }

  render() {
    return (
      <Fragment>
        {
          (this.state.acceso)//if(this.state.acceso)
          ?
          <Tecunity />
          : //else
          <Acceso />
        }
      </Fragment>
    );
  }
}

export default App;
// import React from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <div>
//         <Header />

//         <Route exact path="/" component={Home} />
//         <Route path="/about" component={About} />
//         <Route path="/topics" component={Topics} />
//       </div>
//     </Router>
//   );
// }

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Topic({ match }) {
//   return <h3>Requested Param: {match.params.id}</h3>;
// }

// function Topics({ match }) {
//   return (
//     <div>
//       <h2>Topics</h2>

//       <ul>
//         <li>
//           <Link to={`${match.url}/components`}>Components</Link>
//         </li>
//         <li>
//           <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//         </li>
//       </ul>

//       <Route path={`${match.path}/:id`} component={Topic} />
//       <Route
//         exact
//         path={match.path}
//         render={() => <h3>Please select a topic.</h3>}
//       />
//     </div>
//   );
// }

// function Header() {
//   return (
//     <ul>
//       <li>
//         <Link to="/">Home</Link>
//       </li>
//       <li>
//         <Link to="/about">About</Link>
//       </li>
//       <li>
//         <Link to="/topics">Topics</Link>
//       </li>
//     </ul>
//   );
// }

// export default App;
