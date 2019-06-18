import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import grey from '@material-ui/core/colors/grey'

const white = grey[50];


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

      button: {
          color: 'black',
          margin: '0 10px'
      }
});

class TerceraEtapa extends React.Component {

    state = {
        // The first commit of Material-UI
        selectedDate: new Date(),
      };

    handleDateChange = date => {
        this.setState({ selectedDate: date });
      };

    render(){

        const { classes } = this.props;
        const { selectedDate } = this.state;

        return(
            <Fragment>
                <Typography variant="button" display="block" gutterBottom className={classes.cssLabel}>
                    Por último, agregue etiquetas para una búsqueda precisa
                </Typography>
                <TextField
                // error
                id="standard-full-width"
                label="Etiquetas"
                // style={{ margin: 8 }}
                placeholder="Por ejemplo: calculo, 1er ciclo, C-15..."
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
                <Grid container justify="space-around">
                <Button 
                variant="contained" 
                color={white} 
                className={classes.button}>
                    Enviar
                </Button>
                </Grid>
                
            </Fragment>
        )
    }    
}

TerceraEtapa.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TerceraEtapa);