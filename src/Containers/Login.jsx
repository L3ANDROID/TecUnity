import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import grey from '@material-ui/core/colors/grey'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import logo from './tecunity.png'
import firebase from '../Initializers/firebase';
import googleIcon from './google.png';

const black = grey[900];

//tomar en cuenta que material ui toma los espacios como 8px
const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+logo+')',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  login: {
    backgroundColor: 'white',
  },
  paper: {
    margin: '64px 32px', //theme.spacing(8, 4)
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: '8px', //theme.spacing(1)
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '8px', //theme.spacing(1)
  },
  submit: {
    margin: '24px 0 0', //theme.spacing(3, 0, 2)
  },
  submitGoogle: {
    margin: '20px 0 16px', //theme.spacing(3, 0, 2)
  },
  cssRoot: {
    color: theme.palette.getContrastText(grey[400]),
    backgroundColor: grey[400],
    '&:hover': {
      backgroundColor: grey[600],
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit * 3,
    width: 20
  },
});

class SignIn extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { classes } = this.props

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.login}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Ingrese correo"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Ingrese contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recordar"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                iniciar sesión (proximamente)
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classNames(classes.submitGoogle, classes.cssRoot)}
                onClick={() => {
                  let provider = new firebase.auth.GoogleAuthProvider();//una nueva instacia de google
                  firebase.auth().signInWithPopup(provider)//el metodo auth() llamamos el submetodo de ventana pasandole a google
                  .then(function(result) {//esto es una promesa y que me retornará un resultado
                    if(result.providerData[0].email.substr(-13)==="tecsup.edu.pe"){
                      console.log('exito')
                    }else if(result.providerData[0].email.substr(-9)==="gmail.com"){
                      firebase.auth().signOut()
                    }
                  })
                  .catch(err => console.log(err))//si el usuario no permite su autenticación
                }}
              >
                <img className={classes.leftIcon} src={googleIcon}/>
                Acceder con correo de Tecsup  
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿No tienes una cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }  
}
SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn)