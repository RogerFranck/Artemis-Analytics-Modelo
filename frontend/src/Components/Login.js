// React
import React, { Component } from 'react';
import axios from 'axios';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

//IMG
import ModeloLogo from './Assets/ModeloLogo.png';

//CSS
import './Styles/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      usuario: '',
      password: '',
      Open: false,
      text: '',
    };
  }

  changeUser = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const user = await axios.post('http://localhost:4000/login', {
      usuario: this.state.usuario,
      password: this.state.password,
    });
    if (user.data.status) {
      this.setState({
        text: user.data.status,
        Open: true
      });
    } else {
      localStorage.setItem('JWT-COOL', user.data.token);
      this.props.history.push('/Home/Dash');
    }
  }

  componentDidMount = () => {
    const jwt = localStorage.getItem('JWT-COOL');
    if (jwt) {
      this.props.history.push('/Home/Dash');
    }
  }


  render() {
    return (
      <Grid container component="main" className="Root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="Image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="Paper">
            <Avatar className="Avatar" style={{ width: "80px", height: "80px" }} src={ModeloLogo} />
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form autoComplete="off" onSubmit={this.onSubmit} >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="User"
                value={this.state.usuario}
                onChange={this.changeUser}
                label="User"
                name="usuario"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                value={this.state.password}
                onChange={this.changeUser}
                label="Password"
                type="password"
                id="password"
              />
              <br /><br /><br />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Sign In
              </Button>
            </form>
            <br />
            <Collapse in={this.state.Open}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.setState({
                        Open: false
                      });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {this.state.text}
              </Alert>
            </Collapse>
          </div>
        </Grid>
      </Grid>
    );
  }
}