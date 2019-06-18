import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Slide from '@material-ui/core/Slide';
import purple from '@material-ui/core/colors/purple';
import axios from 'axios'

const styles = theme => ({ 
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
    },
    button: {
      margin: theme.spacing.unit,
    },
    cssRoot: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
      '&:hover': {
        backgroundColor: purple[700],
      },
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.unit * 3,
        right: theme.spacing.unit * 3,
      },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: 'red',
        '&:hover': {
            backgroundColor: 'red',
        },
    }      
})

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class DialogComponent extends React.Component{
    constructor(props){
        super(props)
        this.state={
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    establecerTutor = () => {
        let id = this.props.tutoria.idPublicaciones
        let tipo = '1';
        let tutor = this.props.nombreTutor;
        let datos = {
            tipo: tipo,
            estado: tutor
        }
        let r = window.confirm('Al aceptar se compromete a asesorar esta tutoría bajo su compromiso y responsabilidad, ¿Desea asesorar como Tutor?')
        if (r == true) {
            axios.put(`https://service-tecunity.herokuapp.com/api/publicacion/${id}`, datos)
            .then( res => {
                window.location.reload()
            }).catch( e => console.log(e.toString()) )
          } else {
            return
          }
    }

    render(){
        const {tutoria, classes} = this.props
        return(
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>ELEGIR</Button>
                <Dialog
                fullScreen
                open={this.state.open}
                onClose={this.handleClose}
                TransitionComponent={Transition}
                >
                <AppBar className={classes.appBar}>
                    <Toolbar>
                    <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.flex}>
                        Detalles de la Asesoría
                    </Typography>
                        {(tutoria.tipo==1)
                        ?
                        <Button disabled variant="contained" color="secondary" onClick={this.handleClose}>
                        Asesorar como Tutor
                        </Button>
                        :
                        <Button variant="contained" color="secondary" onClick={this.establecerTutor}>
                        Asesorar como Tutor
                        </Button>
                        }
                    <Button
                        variant="contained"
                        color="primary"
                        className={classNames(classes.button, classes.cssRoot)}
                    >
                    Asistir como Alumno
                    </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                    {/* <ListItemText primary="Phone ringtone" secondary="Titania" /> */}
                        <Typography variant="h4" gutterBottom>
                            {tutoria.titulo}
                        </Typography>
                    </ListItem>
                    
                    <ListItem button>
                        <Typography variant="h6" gutterBottom>
                            {`Día: ${tutoria.fecha.split('-').reverse().join('/')}     de ${tutoria.horario.horaInicio.substr(0,5)} h  a  ${tutoria.horario.horaFin.substr(0,5)} h`}
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`Tutor: ${tutoria.estado}`}
                        </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Curso:" secondary={tutoria.curso.nombre} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Descripción:" secondary={tutoria.descripcion} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                    
                    <div className={classes.root}>
                        <Typography variant="title" gutterBottom>
                        Datos del alumno
                        </Typography>
                        
                        <Paper className={classes.paper}>
                        <Grid container spacing={16}>
                            <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={tutoria.participante.foto} />
                            </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={16}>
                                <Grid item xs>
                                <Typography gutterBottom variant="subheading">
                                    {`Nombre: ${tutoria.participante.nombre}`}
                                </Typography>
                                <Typography variant="subtitle1">{`Correo: ${tutoria.participante.email}`}</Typography>
                                {}
                                <Typography gutterBottom>{`Usuario: ${tutoria.participante.usuario}`}</Typography>
                                <Typography color="textSecondary">{`Telefono: ${tutoria.participante.celular}`}</Typography>
                                <Typography gutterBottom>{`Carrera: ${tutoria.participante.carrera.nombre ? tutoria.participante.carrera.nombre : 'falta definir'}`}</Typography>
                                <Typography gutterBottom>{`Ciclo: ${tutoria.participante.ciclo}`}</Typography>
                                </Grid>
                                {/* <Grid item>
                                <Typography style={{ cursor: 'pointer' }}>Remove</Typography>
                                </Grid> */}
                            </Grid>
                            {/* <Grid item>
                                <Typography variant="subtitle1">{`Telefono: ${tutorias[0].participante.celular}`}</Typography>
                            </Grid> */}
                            </Grid>
                        </Grid>
                        </Paper>
                        {
                            (this.props.correo==tutoria.participante.email)
                            ?
                            <Fab
                            className={classNames(classes.fab, classes.fabGreen)} 
                            color='white' 
                            onClick={()=> {
                                let r = window.confirm('¿Desea eliminar su publicación?')
                                if(r){
                                    axios.delete(`https://service-tecunity.herokuapp.com/api/publicacion/${tutoria.idPublicaciones}`)
                                    .then(res => {
                                        window.location.reload()
                                    })
                                }
                            }}>
                                <DeleteIcon />
                            </Fab>
                            :
                            ''
                        }    
                    </div>
                    </ListItem>
                </List>
                </Dialog>
            </div>
        )
    }
}

DialogComponent.propTypes = {
    tutoria: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(DialogComponent)