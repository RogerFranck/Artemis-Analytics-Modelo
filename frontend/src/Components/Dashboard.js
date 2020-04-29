//REACT JS
import React, { Component } from 'react'

//Axios
import Axios from 'axios';

//TimeAgo js
import { format } from 'timeago.js'

//MATERIAL UI
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

//ICONS
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//CSS
import './Styles/Dashboard.css';

//COLOR
import { grey } from '@material-ui/core/colors';

//IMG
import Vacio from './Assets/Vacio.svg';

//CHARTS
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      InteresadosCount: 0,
      ContactadosCount: 0,
      SemiInscritosCount: 0,
      InscritosCount: 0,
      Citas: [],
      carrera: "",
    };
  }

  async componentDidMount() {
    const jwt = localStorage.getItem('JWT-COOL');
    if (jwt) {
      const user = await Axios.get('http://localhost:4000/login/validar', {
        headers: {
          "x-jwt": jwt
        }
      })
      this.setState({carrera: user.data.carrera})
    }
    this.getdata();
  }

  getdata = async () => {
    const Interesados = await Axios.get('http://localhost:4000/prospectos/Interesados/' + this.state.carrera);
    const Contactados = await Axios.get('http://localhost:4000/prospectos/Contactados/' + this.state.carrera);
    const SemiInscritos = await Axios.get('http://localhost:4000/prospectos/SemiInscritos/' + this.state.carrera);
    const Inscritos = await Axios.get('http://localhost:4000/prospectos/Inscritos/' + this.state.carrera);
    this.setState({
      data: [
        { Type: 'Interesados', area: Interesados.data.length },
        { Type: 'Contactados', area: Contactados.data.length },
        { Type: 'Semi Inscritos', area: SemiInscritos.data.length },
        { Type: 'Inscritos', area: Inscritos.data.length },
      ],
      InteresadosCount: Interesados.data.length,
      ContactadosCount: Contactados.data.length,
      SemiInscritosCount: SemiInscritos.data.length,
      InscritosCount: Inscritos.data.length,
      Citas: Interesados.data,
    });
  }

  handleConfirmar = async (dataUpdate) => {
    if (window.confirm('¿Desea mover el prospecto al apartado de "Contactados"?')) {
      const temp = {
        estado: 2
      }
      await Axios.put('http://localhost:4000/prospectos/' + dataUpdate, temp)
    }
    this.getdata();
  }

  render() {
    const { data: chartData } = this.state;
    const { Citas } = this.state;
    const cita = Citas.map((C) => (
      <ListItem key={C._id} >
        <ListItemText
          primary={C.nombre + " (" + format(C.fechaCita) + ")"}
        />
        <ListItemSecondaryAction>
          <IconButton button onClick={ ()  => this.handleConfirmar(C._id)} >
            <CheckCircleIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    return (
      <Grid container spacing={4} >
        <Grid item xs={12} md={6} lg={3} >
          <Card>
            <CardContent className="cont" >
              <div className="Icon1">
                <AssignmentLateIcon style={{ color: grey[50] }} />
              </div>
              <div>
                <Typography variant="h6" color="textSecondary" >Interesados</Typography>
                <center>
                  <Typography variant="h5" > {this.state.InteresadosCount} </Typography>
                </center>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3} >
          <Card>
            <CardContent className="cont" >
              <div className="Icon1">
                <AssignmentIndIcon style={{ color: grey[50] }} />
              </div>
              <div>
                <Typography variant="h6" color="textSecondary" >Contactados</Typography>
                <center>
                  <Typography variant="h5" >  {this.state.ContactadosCount} </Typography>
                </center>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3} >
          <Card>
            <CardContent className="cont" >
              <div className="Icon1">
                <AssessmentIcon style={{ color: grey[50] }} />
              </div>
              <div>
                <Typography variant="h6" color="textSecondary" >Semi Inscritos</Typography>
                <center>
                  <Typography variant="h5" >  {this.state.SemiInscritosCount} </Typography>
                </center>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3} >
          <Card>
            <CardContent className="cont">
              <div className="Icon1">
                <AssignmentTurnedInIcon style={{ color: grey[50] }} />
              </div>
              <div>
                <Typography variant="h6" color="textSecondary" >Inscritos</Typography>
                <center>
                  <Typography variant="h5" >  {this.state.InscritosCount} </Typography>
                </center>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="contNotas" >
              <div className="tit">
                <Typography>Citas Pendientes</Typography>
              </div>
              {this.state.Citas.length === 0 ?
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={1}
                  m={1}
                >
                  <img src={Vacio} className="img" alt="Cuchara" />
                </Box>
                :
                <List>
                  {cita}
                </List>
              }
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent className="contNotas" >
              <Chart
                data={chartData}
                height={300}
              >
                <ArgumentAxis />
                <ValueAxis max={4} />

                <BarSeries
                  valueField="area"
                  argumentField="Type"
                  color="#673ab7"
                />
                <Title text="Prospectos" />
                <EventTracker />
                <Tooltip />
                <Animation />
              </Chart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}
