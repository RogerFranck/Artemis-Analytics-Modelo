//React
import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

//MATERIAL-UI
import clsx from 'clsx';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import axios from 'axios'

//ICONS
import HomeIcon from '@material-ui/icons/Home';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

//COLOR
import { grey } from '@material-ui/core/colors';

//Components
import Dashboard from './Dashboard'
import Interesados from './Interesados'
import Contactados from './Contactados'
import SemiInscritos from './SemiInscrito'
import Inscritos from './Inscritos'
import Config from './Config'
import { keys } from '@material-ui/core/styles/createBreakpoints';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
    backgroundColor: " rgba(0, 0, 0, 0)",
    color: "black",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    backgroundColor: "#1a237e",
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#1a237e",
    color: 'white',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#1a237e",
    color: 'white',
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [PopperOpen, setPopperOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [prospectos, setProspectos] = React.useState([]) 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const busqueda = async (e) => {
    const resultados = await axios.get('http://localhost:4000/prospectos/' + e.target.value)
    setProspectos(resultados.data)
    setPopperOpen(true)
  }

  const ClosePopper = () => 
  {
    setPopperOpen(false);
  };

  const seleccion = (estado) =>
  {
    console.log(estado);
    setPopperOpen(false);
  }
  
  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              style={{ color: grey[50] }}
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap className={classes.title} >
              Artemis Analytics Modelo
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                ref={anchorRef}
                onChange={busqueda}
                inputProps={{ 'aria-label': 'search' }}
              />
              <Popper open={PopperOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={ClosePopper()}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" >
                         {
                           prospectos.map(prospectos =>
                            <MenuItem onClick={seleccion(prospectos.estado)} key={prospectos._id}>{prospectos.nombre}</MenuItem>
                            )
                         }
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
            <IconButton
              color="inherit"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open2}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/Home/Config" onClick={handleClose} >Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Cerrar sesión</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: grey[50] }} />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Tooltip title="Home" >
              <ListItem
                button
                component={Link}
                to="/Home/Dash"
              >
                <ListItemIcon><HomeIcon style={{ color: grey[50] }} /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Tooltip>
            <Tooltip title="Interesados" >
              <ListItem
                button
                component={Link}
                to="/Home/Interesados"
              >
                <ListItemIcon><AssignmentLateIcon style={{ color: grey[50] }} /></ListItemIcon>
                <ListItemText primary="Interesado" />
              </ListItem>
            </Tooltip>
            <Tooltip title="Contactados" >
              <ListItem
                button
                component={Link}
                to="/Home/Contactados"
              >
                <ListItemIcon><AssignmentIndIcon style={{ color: grey[50] }} /></ListItemIcon>
                <ListItemText primary="Contactado" />
              </ListItem>
            </Tooltip>
            <Tooltip title="Semi Inscritos" >
              <ListItem
                button
                component={Link}
                to="/Home/SemiInscritos"
              >
                <ListItemIcon><AssessmentIcon style={{ color: grey[50] }} /></ListItemIcon>
                <ListItemText primary="Semi Inscrito" />
              </ListItem>
            </Tooltip>
            <Tooltip title="Inscritos" >
              <ListItem
                button
                component={Link}
                to="/Home/Inscritos"
              >
                <ListItemIcon><AssignmentTurnedInIcon style={{ color: grey[50] }} /></ListItemIcon>
                <ListItemText primary="Inscrito" />
              </ListItem>
            </Tooltip>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route path="/Home/Dash" exact component={Dashboard} />
          <Route path="/Home/Interesados" exact component={Interesados} />
          <Route path="/Home/Contactados" exact component={Contactados} />
          <Route path="/Home/SemiInscritos" exact component={SemiInscritos} />
          <Route path="/Home/Inscritos" exact component={Inscritos} />
          <Route path="/Home/Config" exact component={Config} />
        </main>
      </div>
    </Router>
  );
}
