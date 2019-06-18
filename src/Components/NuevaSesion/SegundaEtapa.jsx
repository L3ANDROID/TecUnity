import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import PropTypes from 'prop-types'


const styles = theme => ({
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
    
      cssLabel: {
        color : 'white'
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
});

class SegundaEtapa extends React.Component {
    constructor(props){
        super(props)
        let fecha = new Date();
        this.state = {
            // The first commit of Material-UI
            dia: null,
            horarioInicio: null,
            horarioFin: null
          };
    }

    handleDateChange = date => {
        this.setState({ dia: date });
        console.log(date.toLocaleDateString())
      };
    
    handleTimeStartChange = date => {
        let fecha = `${date.toDateString()} ${date.toLocaleTimeString().split(':')[0]}:00:00 GMT-0500 (hora estándar de Perú)`
        let hora = Number(date.toLocaleTimeString().split(':')[0])+2
        if(hora>24){
            hora=(hora-24).toString();
        }
        let nuevaFecha = `${date.toDateString()} ${hora.toString()}:00:00 GMT-0500 (hora estándar de Perú)`
        this.setState({ horarioInicio: fecha, horarioFin: nuevaFecha });
        console.log(date.toLocaleTimeString().substr(0,5), fecha, nuevaFecha)
    };    

    handleTimeEndChange = date => {
        let hora = (this.state.horarioInicio.toLocaleTimeString().split(':')[0].parseInt()+2)
        let fecha = `${date.toDateString()} ${hora}:00:00 GMT-0500 (hora estándar de Perú)`
        this.setState({ horarioFin: fecha });
        console.log(hora)
    };

    render(){

        const { classes } = this.props;
        const { dia, horarioInicio, horarioFin } = this.state;

        return(
            <Fragment>
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
                        onChange={this.handleTimeEndChange}
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
                </MuiPickersUtilsProvider>
                
            </Fragment>
        )
    }    
}

SegundaEtapa.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SegundaEtapa);