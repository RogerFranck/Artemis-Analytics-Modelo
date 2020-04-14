// React
import React, { Component } from 'react';

// Material UI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

//IMG
import ModeloLogo from './Assets/ModeloLogo.png';

//CSS
import './Styles/Login.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      User:'',
      Password:''
    };
  }
  render(){
    return (
      <Grid container component="main" className="Root">
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className="Image" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="Paper">
            <Avatar className="Avatar" style={{width: "80px",height:"80px"}} src={ModeloLogo} />
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="User"
                label="User"
                name="User"
                autoComplete="User"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
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
          </div>
        </Grid>
      </Grid>
    );
  } 
}