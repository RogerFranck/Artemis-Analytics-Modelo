import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box';
import Animation from './Animation'

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
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
    if(this.state.user === undefined) {
        return (
          <div>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={1}
              m={1}
              css={{ height: 580 }}
            >
              <Animation/>
            </Box>
          </div>
        )
  }
  return(
      <div> { this.props.children } </div >
    )
  }
}

export default withRouter(Auth);