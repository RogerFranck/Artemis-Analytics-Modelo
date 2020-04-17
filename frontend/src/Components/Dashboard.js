//REACT JS
import React, { Component } from 'react'

//Axios
import Axios from 'axios';

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
import DeleteIcon from '@material-ui/icons/Delete';

//CSS
import './Styles/Dashboard.css';

//COLOR
import { grey } from '@material-ui/core/colors';

//IMG
import Vacio from './Assets/Vacio.svg';

//CHARTS
import {
  Chart,
  PieSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { Animation } from '@devexpress/dx-react-chart';

//INFO
const data = [
  { country: 'Russia', area: 12 },
  { country: 'Canada', area: 7 },
  { country: 'USA', area: 7 },
  { country: 'China', area: 7 },
];

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data,
      InteresadosCount:0,
      ContactadosCount:0,
      SemiInscritosCount:0,
      InscritosCount:0,
    };
  }

  async componentDidMount() {
    this.getdata();
  }

  getdata = async () => {
    const Interesados = await Axios.get('http://localhost:4000/prospectos/Interesados');
    const Contactados = await Axios.get('http://localhost:4000/prospectos/Contactados');
    const SemiInscritos = await Axios.get('http://localhost:4000/prospectos/SemiInscritos');
    const Inscritos = await Axios.get('http://localhost:4000/prospectos/Inscritos');
    this.setState({
      InteresadosCount:Interesados.data.length,
      ContactadosCount:Contactados.data.length,
      SemiInscritosCount:SemiInscritos.data.length,
      InscritosCount:Inscritos.data.length,
    });
  }

  render() {
    const { data: chartData } = this.state;
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
                  <Typography variant="h5" > { this.state.InteresadosCount } </Typography>
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
                  <Typography variant="h5" >  { this.state.ContactadosCount } </Typography>
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
                  <Typography variant="h5" >  { this.state.SemiInscritosCount } </Typography>
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
                  <Typography variant="h5" >  { this.state.InscritosCount } </Typography>
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
              {/* <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                p={1}
                m={1}
              >
                <img src={Vacio} className="img" alt="Cuchara" />
              </Box> */}
              <List>
                <ListItem>
                  <ListItemText
                    primary="Roger  (2 Dias)"
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Sergio (6 Dias)"
                  />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
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
                <PieSeries
                  valueField="area"
                  argumentField="country"
                />
                <Title
                  text="Prospectos"
                />
                <Animation />
              </Chart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}
