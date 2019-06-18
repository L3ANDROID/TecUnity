import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialogComponent from './DialogComponent'
import firebase from '../Initializers/firebase';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    card: {
      maxWidth: 400,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    item: {
      minWidth: '350px',
      maxHeight: '400px',
      margin: '1em',
      boxSizing: 'border-box'
    },
    media2: {
      minWidth: '200px'
    },
    expand: {
      marginLeft: 'auto',
      transform: 'rotate(0deg)',
    }, 
  })
  
  class RecipeReviewCard extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        open: false,
        tutorias: [],
        cambio: false,
        correo: ''
      };
    }

    componentWillMount(){
      axios.get('https://service-tecunity.herokuapp.com/api/publicaciones/')
      .then(res => {
        this.setState({
          tutorias: res.data
        })
      });
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ correo: user.providerData[0].email })
      })
    }

    // componentWillReceiveProps(newProps){
    //   this.setState({cambio: !this.state.cambio})
    // }
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render(){
      const { classes } = this.props
      return (
        <div container className={classes.root}>
          {this.state.tutorias.map((tutoria, i) => {
            return(
            <Fragment key={i}>
              <Card className={classes.item}>
                <CardHeader
                avatar={
                    <Avatar aria-label="Recipe" className={classes.avatar} src={tutoria.participante.foto} />
                }
                action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                }
                title={tutoria.titulo}
                subheader={`Día: ${tutoria.fecha.split('-').reverse().join('/')}     de ${tutoria.horario.horaInicio.substr(0,5)}  a  ${tutoria.horario.horaFin.substr(0,5)}`}
                />
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {tutoria.descripcion}
                </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="Add to favorites">
                      <FavoriteIcon />
                  </IconButton>
                  {/* <IconButton aria-label="Share">
                      <ShareIcon />
                  </IconButton> */}
                  {
                  (tutoria.tipo==0 || tutoria.tipo==null)
                  ?  
                    <Typography variant="subtitle2" gutterBottom color="error">
                      Tutoría disponible!!
                    </Typography>
                  :
                    <Fragment>
                      <Typography variant="subtitle2" gutterBottom color="error">
                        Tutoría ya asesorada :(
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom color="error">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{`${tutoria.estado=='en curso' ? '' : 'por '+tutoria.estado}`}
                      </Typography>
                    </Fragment>
                  }
                  {
                    (this.props.user)
                    ?
                    <div className={classes.expand}>
                      <DialogComponent correo={this.state.correo} tutoria={tutoria} nombreTutor={this.props.nombreTutor}></DialogComponent>
                    </div>
                    :
                    <Button disabled className={classes.expand} variant="contained" color="secondary">NO DISPONIBLE</Button>
                  }
                  
                </CardActions>
            </Card>
            
          </Fragment>
          );
          })}
        </div>
      );
    }
  }

  RecipeReviewCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(RecipeReviewCard)