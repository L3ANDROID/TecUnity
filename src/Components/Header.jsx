import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExitToApp from '@material-ui/icons/ExitToApp';

import TabHeader from './TabHeader'

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = () => ({
  secondaryBar: {
    zIndex: 0,
  },
  iconButtonAvatar: {
    padding: 4,
  },
  button: {
    borderColor: lightColor,
  },
});

class Header extends Component {
  constructor(props){
    super(props)
    this.state={
      pestana:1
    }
  }

  render(){
    return (
      <React.Fragment>
        <AppBar
          key="primero"
          component="div"
          className={this.props.classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={8}>
              <Grid item xs>
                <Typography color="inherit" variant="h5">
                Solicitar Asesoría
                </Typography>
              </Grid>
              {
                (this.props.user)
                ?
                <Grid item>
                  {`Bienvenido, ${this.props.name.split(" ")[0]}`}&nbsp;&nbsp;
                  <IconButton color="inherit" className={this.props.classes.iconButtonAvatar}>
                    <Avatar className={this.props.classes.avatar} src={this.props.photo}/>
                  </IconButton>
                  <IconButton onClick={this.props.logout} color="inherit" key='auth-sign-out-button-element'>
                    <ExitToApp />
                  </IconButton>
                </Grid>
                :
                <Grid item>
                  <Button className={this.props.classes.button} onClick={this.props.login} variant="outlined" color="inherit" size="small">
                    Iniciar sesión
                  </Button>
                </Grid>
              }
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          key="segundo"
          component="div"
          className={this.props.classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
        {/* <Tabs value={0} textColor="inherit">
          <Tab textColor="inherit" label="Inicio" />
          <Tab textColor="inherit" label="Preguntas" />
          <Tab textColor="inherit" label="Etiquetas" />
        </Tabs> */}
        {
          (this.props.user)
          ?
          <TabHeader></TabHeader>
          :
          <AppBar
          key="sub"
          component="div"
          className={this.props.classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Typography variant="h6" paragraph align="center" color="error">Debes iniciar sesion para esta sección</Typography>
        </AppBar>
        }
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);