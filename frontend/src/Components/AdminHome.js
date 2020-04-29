import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import AdminNav from './AdminNav'
import AdminTable from './AdminTable'
import axios from 'axios';

export default class AdminHome extends Component {

  componentDidMount = async () => {
    const jwt = localStorage.getItem('JWT-COOL');
    if (jwt) {
      const user = await axios.get('http://localhost:4000/login/validar', {
        headers: {
          "x-jwt": jwt
        }
      })
      if(user.data.tipo==="1"){
        window.location.href = '/Home/Dash';
      }
    }
  }

  render() {
    return (
      <>
        <AdminNav/>
        <br/><br/><br/>
        <Container>
          <AdminTable/>
        </Container>
      </>
    )
  }
}
