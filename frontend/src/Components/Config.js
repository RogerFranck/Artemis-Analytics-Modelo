import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import "./Styles/Config.css"

export default class Config extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined,
    };
  }

  componentDidMount = () => {
    const jwt = localStorage.getItem('JWT-COOL');
    if (!jwt) {
      this.props.history.push('/Login');
    }
    axios.get('http://localhost:4000/login/validar', {
      headers: {
        "x-jwt": jwt
      }
    }).then(res => this.setState({
      user: res.data
    })).catch(err => {
      localStorage.removeItem('JWT-COOL');
      this.props.history.push('/Login');
    });
  }

  render() {
    if (this.state.user === undefined) {
      return <div></div>
    }
    return (
      <Grid container spacing={3} >
        <Grid item xs={12} md={6} >
          <Card>
            <CardContent>
              <h2>Nombre:</h2>
              <center>
                <h3>{this.state.user.nombre}</h3>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} >
          <Card>
            <CardContent>
              <h2>Correo:</h2>
              <center>
                <h3>{this.state.user.correo}</h3>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} >
          <Card>
            <CardContent>
              <h2>Numero:</h2>
              <center>
                <h3>{this.state.user.numero}</h3>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} >
          <Card>
            <CardContent>
              <h2>Usuario:</h2>
              <center>
                <h3>{this.state.user.usuario}</h3>
              </center>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} ><br/></Grid>
        <Grid item xs={12}>
          <center>
            {/* <a  className="a" href="#" >Exportar prospectos</a> */}
          </center>
        </Grid>
      </Grid>
    )
  }
}
