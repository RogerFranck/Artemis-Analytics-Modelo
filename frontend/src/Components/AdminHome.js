import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import AdminNav from './AdminNav'
import AdminTable from './AdminTable'

export default class AdminHome extends Component {
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
