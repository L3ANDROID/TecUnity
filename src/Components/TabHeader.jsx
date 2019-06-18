import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import green from '@material-ui/core/colors/green';
import axios from 'axios'
import firebase from '../Initializers/firebase';

import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

import Button from '@material-ui/core/Button'
import grey from '@material-ui/core/colors/grey'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputBase from '@material-ui/core/InputBase';

const white = grey[50];

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 2,
    },
  },
  input: {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white',
    fontSize: 16,
    width: 'auto',
    // height: 33,
    padding: '17px 15px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  fab: {
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 123,
  },
  fabGreen: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
  },
//-----------------------ESTILOS PRIMERA, SEGUNDA Y TERCERA ETAPA---------------------------
  multilineColor:{
      color:'white'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  textField2: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  cssLabel: {
    color : 'white'
  },
  cssText: {
    color : 'white',
    margin: 25
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `white !important`,
    }
  },
  cssFocused: {},
  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  button: {
    color: 'black',
    margin: '0 10px'
  },
  margin: {
    margin: theme.spacing.unit,
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  icon: {
    fill: 'white'
  }
});

class TabHeader extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      value: 0,
      cursos: [],
      idcurso: 0,
      titulo: '',
      descripcion: '',
      etiquetas: '',
      dia: null,
      diaString: '',
      horarioInicio: null,
      horarioFin: null,
      idhorario: 0,
      participanteid: 0
    };
  }
  
  componentWillMount(){
    axios.get('https://service-tecunity.herokuapp.com/api/cursos/')
    .then( res => {
      this.setState({
        cursos: res.data
      })
    }).catch( e => console.log(e.toString()));
    firebase.auth().onAuthStateChanged(user => {
      try{
        axios.get(`https://service-tecunity.herokuapp.com/api/participanteCorreo/${user.providerData[0].email}`)
        .then(res => {
          this.setState({ 
            participanteid: res.data.idParticipante
          })
        });
      }catch(e){}  
    })
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleTitleChange = (e) => {
    this.setState({ titulo: e.target.value })
  }

  handleDescriptionChange = (e) => {
    this.setState({ descripcion: e.target.value })
  }

  handleDateChange = date => {
    this.setState({ dia: date, diaString: date.toISOString().substr(0,10) });
    console.log(date.toLocaleDateString(),date.toISOString().substr(0,10))
  };

  handleCursoChange = event => {
    this.setState({ idcurso: event.target.value });
  };

  handleTimeStartChange = date => {
      let prehora = date.toLocaleTimeString().split(':')[0]
      let fecha = `${date.toDateString()} ${prehora}:00:00 GMT-0500 (hora estándar de Perú)`
      let hora = Number(prehora)+2
      if(hora>24){
          hora=(hora-24).toString();
      }
      let nuevaFecha = `${date.toDateString()} ${hora.toString()}:00:00 GMT-0500 (hora estándar de Perú)`
      this.setState({ horarioInicio: fecha, horarioFin: nuevaFecha });
      switch(prehora){
        case '08':
          this.setState({ idhorario: 2 })
          break;
        case '09':
          this.setState({ idhorario: 12 })
          break;
        case '10':
          this.setState({ idhorario: 22 })
          break;
        case '11':
          this.setState({ idhorario: 32 })
          break;
        case '12':
          this.setState({ idhorario: 42 })
          break;
        case '13':
          this.setState({ idhorario: 52 })
          break;
        case '14':
          this.setState({ idhorario: 62 })
          break;
        case '15':
          this.setState({ idhorario: 72 })
          break;
        case '16':
          this.setState({ idhorario: 82 })
          break;
        case '17':
          this.setState({ idhorario: 92 })
          break;
        case '18':
          this.setState({ idhorario: 102 })
          break;
        case '19':
          this.setState({ idhorario: 112 })
          break;
        default:
          alert('El horario escogido no está disponible, elija otro entre las 8:00 am y 7:00 pm')
          this.setState({ horarioInicio: null, horarioFin: null });
      }
      console.log(date.toLocaleTimeString().substr(0,7), fecha, nuevaFecha)
  };

  handleEtiquetasChange = (e) => {
    this.setState({ etiquetas: e.target.value })
  }

  enviarAsesoria = () => {
    let datos = {
      titulo: this.state.titulo,
      descripcion: this.state.descripcion,
      etiqueta: this.state.etiquetas,
      fecha: this.state.diaString,
      tipo: '0',
      curso: {
        idCursos: this.state.idcurso
      },
      horario: {
        idHorarios: this.state.idhorario
      },
      participante: {
        idParticipante: this.state.participanteid
      }
    }
    if(this.state.titulo=='' || this.state.descripcion=='' || this.state.etiquetas=='' || this.state.diaString=='' || this.state.idcurso==0 || this.state.idhorario==0 || this.state.participanteid==0){
      alert('Debe rellenar todos los campos para publicar la tutoria.')
      return
    }else{
      console.log(datos)
      axios.post('https://service-tecunity.herokuapp.com/api/publicacion', datos)
      .then( res => {
        this.setState( {
          idcurso: 0,
          titulo: '',
          descripcion: '',
          etiquetas: '',
          dia: null,
          horarioInicio: null,
          horarioFin: null,
          idhorario: 0,
          participanteid: 0
        });
      })
      .catch( e => console.log(e.toString()) )
      setTimeout(window.location.reload(), 5000)
    }  
  }

  render() {
    const { classes, theme } = this.props;
    const { dia, horarioInicio, horarioFin } = this.state;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    const fabs = [
      {
        color: 'white',
        className: classes.fab,
        icon: <ArrowIcon />,
      },
      {
        color: 'white',
        className: classes.fab,
        icon: <ArrowIcon />,
      },
      {
        className: classNames(classes.fab),// , classes.fabGreen
        color: 'white',
        icon: <ReplayIcon />,
      },
    ];

    return (
      <div key="tabs">
        <AppBar position="static">
          <Tabs textColor="inherit"
            value={this.state.value}
            onChange={this.handleChange}
            textColor="inherit"
          >
            <Tab label="Primera Etapa" />
            <Tab label="Segunda Etapa" />
            <Tab label="Tercera Etapa" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Fragment> {/*---------------------PRIMERA ETAPA---------------------------*/}
              <TextField
                // error
                id="standard-full-width"
                label="Titulo"
                // style={{ margin: 8 }}
                placeholder="Ingrese titulo del problema"
                value={this.state.titulo}
                onChange={this.handleTitleChange}
                // helperText="Full width!"
                fullWidth
                margin="normal"
                variant="outlined"
                // InputLabelProps={{
                // shrink: true,
                // }}
                InputLabelProps={{
                    classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.multilineColor
                    },
                    inputMode: "numeric"
                }}
              />
              <TextField
                // error
                className = "textfield"
                label="Descripción"
                placeholder="Ingrese descripción del problema"
                value={this.state.descripcion}
                onChange={this.handleDescriptionChange}
                fullWidth
                multiline
                // InputLabelProps={{
                //     shrink: true,
                //     }}
                InputLabelProps={{
                    classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.multilineColor
                    },
                    inputMode: "numeric"
                }}
                rows    = "2"
                margin  = "normal"
                variant="outlined"
              />   
            </Fragment>
          </TabContainer>

          <TabContainer dir={theme.direction}>
            <Fragment>{/*---------------------SEGUNDA ETAPA---------------------------*/}
              <Typography variant="button" display="block" gutterBottom className={classes.cssLabel}>
                  Ingrese fecha y hora de la sesión
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <DatePicker
                      className={classes.textField}
                      margin="normal"
                      label="Dia de la sesión"
                      fullWidth
                      value={dia}
                      onChange={this.handleDateChange}
                      InputLabelProps={{
                          classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                          },
                      }}
                      InputProps={{
                          classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                          input: classes.multilineColor
                          }
                      }}
                      variant="outlined"
                  />
                  <TimePicker
                      // disableMinutes={ true }
                      margin="normal"
                      label="Horario inicio"
                      value={horarioInicio}
                      onChange={this.handleTimeStartChange}
                      InputLabelProps={{
                          classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                          },
                      }}
                      InputProps={{
                          classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                          input: classes.multilineColor
                          }
                      }}
                      variant="outlined"
                  />
                  <TimePicker
                      error
                      disabled
                      margin="normal"
                      label="Horario fin"
                      value={horarioFin}
                      InputLabelProps={{
                          classes: {
                          root: classes.cssLabel,
                          focused: classes.cssFocused,
                          },
                      }}
                      InputProps={{
                          classes: {
                          root: classes.cssOutlinedInput,
                          focused: classes.cssFocused,
                          notchedOutline: classes.notchedOutline,
                          input: classes.multilineColor
                          }
                      }}
                      variant="outlined"
                  />
                </Grid>
                <Typography variant="subtitle2" gutterBottom display="block" gutterBottom className={classes.cssText} align='center'>
                    Los horarios son fijos y establecidos. Las asesorías se separan en bloques de 2 horas, usted puede tomar todo o parte del horario.
                </Typography>
              </MuiPickersUtilsProvider>
            </Fragment>

          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Fragment>{/*---------------------TERCERA ETAPA---------------------------*/}
              <Typography variant="button" display="block" gutterBottom className={classes.cssLabel}>
                  Por último, agregue etiquetas y el curso
              </Typography>
              <Grid container justify="space-around">
                <TextField
                // error
                className={classes.textField2}
                id="standard-full-width"
                label="Etiquetas"
                // style={{ margin: 8 }}
                placeholder="Por ejemplo: calculo, 1er ciclo, C-15..."
                value={this.state.etiquetas}
                onChange={this.handleEtiquetasChange}
                // helperText="Full width!"
                fullWidth
                margin="normal"
                variant="outlined"
                // InputLabelProps={{
                // shrink: true,
                // }}
                InputLabelProps={{
                    classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                    },
                }}
                InputProps={{
                    classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.multilineColor
                    },
                    inputMode: "numeric"
                }}
                />
                <FormControl className={classes.textField2}>
                  <InputLabel htmlFor="curso-customized-select" className={classes.bootstrapFormLabel}>
                    Curso
                  </InputLabel>
                  <Select
                    value={this.state.idcurso}
                    onChange={this.handleCursoChange}
                    input={<BootstrapInput name="curso" id="curso-customized-select" />}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem value="">
                      Seleccione curso
                    </MenuItem>
                    {this.state.cursos.map((cursoP,i) => (
                    <MenuItem key={i} value={cursoP.idCursos}>{cursoP.nombre}</MenuItem>
                    ))
                    }
                  </Select>
                  <FormHelperText>Elija un curso</FormHelperText>
                </FormControl>
                <Grid container justify="space-around">
                  <Button 
                  variant="contained" 
                  color={white} 
                  className={classes.button}
                  onClick={this.enviarAsesoria}>
                      Enviar
                  </Button>
                </Grid>
              </Grid>  
            </Fragment>
          </TabContainer>

        </SwipeableViews>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
            key={fab.className}
            className={fab.className} 
            color={fab.color} 
            onClick={()=> {
              this.setState({value: index+1});
              if(index==2){
                this.setState({value: 0})
              }
              }}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </div>
    );
  }
}

TabHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TabHeader);