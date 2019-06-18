import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
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

function PrimeraEtapa(props){

    const {classes} = props
    return(
        <Fragment>
            <TextField
                // error
                id="standard-full-width"
                label="Titulo"
                // style={{ margin: 8 }}
                placeholder="Ingrese titulo del problema"
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
    )
}

PrimeraEtapa.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PrimeraEtapa);