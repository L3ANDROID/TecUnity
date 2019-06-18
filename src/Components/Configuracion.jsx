import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';

import axios from 'axios'
import RecipeReviewCard from './Tutorias';
import firebase from '../Initializers/firebase';

const styles = theme => ({
    bigAvatar: {
        margin: '0 170px',
        width: 200,
        height: 200,
    },
    root: {
        width: '100%',
        maxWidth: 700,
      },
      root2: {
        margin: '20px 0',
        maxWidth: 1100,
      },
      card: {
        width: 1020,
        height: 250,
        display: 'flex',
      },
      cardDetails: {
        margin: 15,
        flex: 1,
      },
      cardMedia: {
        width: 250,
      },
      paper: {
        margin: 'auto',
        overflow: 'hidden',
        
      },
      searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      },
      searchInput: {
        fontSize: theme.typography.fontSize,
      },
      block: {
        display: 'block',
      },
      addUser: {
        marginRight: theme.spacing.unit,
      },
      dataUser:{
        marginTop: '0',
      },
      cicloUser:{
        margin: '0 5px',
        width: 530
      }
})

const featuredPosts = [
  {
    nombre: 'Leandro Morocho Soca',
    usuario: '@Username',
    email:
      ' leandro.morocho@tecsup.edu.pe',
    carrera: ' Desarrollo de software e integración de sistemas (C15)',
    ciclo: ' 4to ciclo'
  }
];

class Configuracion extends React.Component{
  constructor(props){
    super(props)
    this.state=({
      participante: [],
      carrera: [],
      open: false,
      user: false,
      nombre: '',
      username: '',
      carreras: [],
      carreraID: 0,
      carreraN: '',
      ciclo: '',
      celular: ''
    })

    this.cambioUsername = this.cambioUsername.bind(this);
    this.cambioCarrera = this.cambioCarrera.bind(this);
    this.cambioCiclo = this.cambioCiclo.bind(this);
    this.cambioCelular = this.cambioCelular.bind(this);
  }

  componentWillMount() {
    axios.get('https://service-tecunity.herokuapp.com/api/carreras/')
    .then(res => {
      this.setState({ carreras: res.data })
      console.log(this.state.carreras)
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user.providerData[0].email.substr(-13)==="tecsup.edu.pe"){
        axios.get(`https://service-tecunity.herokuapp.com/api/participanteCorreo/${user.providerData[0].email}`)
        .then(res => {
          this.setState({ 
            participante: res.data, 
            user: true,
            nombre: res.data.nombre, 
            username: res.data.usuario, 
            celular: res.data.celular, 
            ciclo: res.data.ciclo,
            carreraID: res.data.carrera.idCarreras,
            carreraN: res.data.carrera.nombre
          })
          if(res.data.carrera){
            this.setState({carrera: res.data.carrera})
          }
          console.log(res.data.carrera.idCarreras)
        });
      }  
    })
  }

  cambioUsername(e) {
    this.setState( {
      username: e.target.value
    })
  }

  cambioCarrera(e){
    this.setState({
      carreraID: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  cambioCiclo(e){
    // this.setState({ [e.target.name]: e.target.value });
    this.setState({
      ciclo: e.target.value
    })
    console.log(e.target.name, e.target.value)
  }

  cambioCelular(e){
    this.setState({
      celular: e.target.value
    })
    console.log(e.target.value)
  }

  modificarDatos = () => {
    let cod = this.state.participante.email
    let datos = {
      usuario : this.state.username,
      celular: this.state.celular,
      ciclo: this.state.ciclo,
      carrera : {
        idCarreras: this.state.carreraID
      }  
    }
    axios.put(`https://service-tecunity.herokuapp.com/api/participanteCorreo/${cod}`, datos )
      .then(res => {
        if(res.data.carrera){
          this.setState({carrera: res.data.carrera})
        }
        this.setState({ 
          participante: res.data, 
          user: true, 
          username: res.data.usuario, 
          celular: res.data.celular, 
          ciclo: res.data.ciclo,
          carreraID: res.data.carrera.idCarreras,
          carreraN: res.data.carrera.nombre,
          open: !this.state.open
        })
        console.log(res.data.carrera.idCarreras,res.data.carrera.nombre)
      }).catch((error)=>{
        console.log(error.toString());
      }); 
  }

  openDialog = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render(){
    const { open, participante, carrera } = this.state;
    const { classes } = this.props;
    return(
        <div>

        <div className={classes.root2}>
          <Grid container>
            <Grid item xs={12}>
            <Paper className={classes.paper}>
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                  <Grid container spacing={16} alignItems="center">
                    <Grid item>
                      <SearchIcon className={classes.block} color="inherit" />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Buscar tutoria"
                        InputProps={{
                          disableUnderline: true,
                          className: classes.searchInput,
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Button variant="contained" color="primary" className={classes.addUser}>
                        BUSCAR
                      </Button>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>

              <RecipeReviewCard user={this.state.user} nombreTutor={this.state.nombre}></RecipeReviewCard>
              
            </Paper>
            </Grid>
          </Grid>
        </div>

        <Grid container className={classes.cardGrid} alignItems="center" onClick={(this.state.user) ? this.openDialog : (e) => e.preventDefault()}>
            {/* {featuredPosts && featuredPosts.map((post,index) => ( */}
              <Grid item key={participante.id} xs={12} md={9}>
                <CardActionArea component="a">
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        {
                          (this.state.user)
                          ?
                          <div>
                            <Typography component="h1" variant="h3" color="textSecondary">
                              {participante.nombre}
                            </Typography>
                            <Typography variant="h5" paragraph>
                              {participante.usuario ? participante.usuario : "debe registrar su nombre de usuario"}
                            </Typography>
                            <Typography variant="h5" paragraph color="textSecondary">
                              correo:{participante.email}
                            </Typography>
                            <Typography variant="subtitle1" color="primary" color="textSecondary">
                              carrera:{this.state.carreraN ? this.state.carreraN : "debe registrar una carrera"}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                              ciclo:{participante.ciclo ? participante.ciclo : "debe registrar un ciclo"}
                            </Typography>
                          </div>
                          :
                          <Typography component="h1" variant="h3" color="textSecondary" align="center">
                            {`Debe iniciar sesión para ver su perfil`}
                          </Typography>
                        }
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={participante.foto}
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
              </Grid>
            {/* ))} */}
          </Grid>

          <Dialog open={open} onClose={this.openDialog} disableBackdropClick={true}>
            <DialogTitle id="form-dialog-title">
              <Avatar className={classes.bigAvatar} src={participante.foto}>
              </Avatar>
            </DialogTitle>
            <DialogContent>
              <TextField
                disabled
                className={classes.dataUser}
                margin="normal"
                id="fullname"
                label="NOMBRE"
                type="text"
                placeholder={`${participante.nombre}`}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                className={classes.dataUser}
                margin="normal"
                id="username"
                label="USERNAME"
                type="text"
                placeholder={`${participante.usuario ? participante.usuario : "debe registrar su nombre de usuario"}     (editable)`}
                value={this.state.username} 
                onChange={this.cambioUsername}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                className={classes.dataUser}
                margin="normal"
                id="correo"
                label="CORREO"
                type="email"
                placeholder={`${participante.email}`}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              
              <FormControl className={classes.cicloUser}>
                <InputLabel shrink htmlFor="carrera-label-placeholder">
                  Carrera
                </InputLabel>
                <Select
                  value={carrera.idCarreras}
                  onChange={this.cambioCarrera}
                  input={<Input name="carrera" id="ciclo-label-placeholder" />}
                  displayEmpty
                >
                  <MenuItem value={null}>
                    <em>Ingrese una carrera</em>
                  </MenuItem>
                  {this.state.carreras.map((carreraP,i) => (
                    <MenuItem key={i} value={carreraP.idCarreras}>{carreraP.nombre}</MenuItem>
                  ))
                  }
                </Select>
              </FormControl>

              <FormControl className={classes.cicloUser}>
                <InputLabel shrink htmlFor="ciclo-label-placeholder">
                  Ciclo
                </InputLabel>
                <Select
                  value={participante.ciclo}
                  onChange={this.cambioCiclo}
                  input={<Input name="ciclo" id="ciclo-label-placeholder" />}
                  displayEmpty
                >
                  <MenuItem value={null}>
                    <em>Ingrese ciclo</em>
                  </MenuItem>
                  <MenuItem value={'I'}>1er ciclo</MenuItem>
                  <MenuItem value={'II'}>2do ciclo</MenuItem>
                  <MenuItem value={'III'}>3er ciclo</MenuItem>
                  <MenuItem value={'IV'}>4to ciclo</MenuItem>
                  <MenuItem value={'V'}>5to ciclo</MenuItem>
                  <MenuItem value={'VI'}>6to ciclo</MenuItem>
                </Select>
              </FormControl>
              <TextField
                className={classes.dataUser}
                margin="normal"
                id="celular"
                label="CELULAR"
                type="text"
                value={this.state.celular}
                onChange={this.cambioCelular}
                placeholder={`${participante.celular ? participante.celular : "Ingrese su número"}     (editable)`}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <DialogContentText>
                Una vez modificado, sus datos se mostrarán a los demás usuarios.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.openDialog} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.modificarDatos} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

      </div>
    )
    }
}

Configuracion.propTypes = {
    classes: PropTypes.object.isRequired,
  }; 

export default withStyles(styles)(Configuracion)