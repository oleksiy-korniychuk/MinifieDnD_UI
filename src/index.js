import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import dndLogo from './assets/DnD_Bug_1c_Red_V1_XL_RGB.png';
import testImage from './assets/DND_Art1.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import reportWebVitals from './reportWebVitals';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CharacterPage from './Character/CharacterPage';
import WorldbuildingPage from './Worldbuilding/WorldbuildingPage';

import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
      contrastText: '#fff',
    },
    secondary: {
      light: '#91ff35',
      main: '#76ff03',
      dark: '#52b202',
      contrastText: '#000',
    },
    type: 'dark',
  },
});

const Header = (props) => (
  <Grid container justify="center">
      <Grid item xs={12} id="welcome-banner">
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={props.onTitleClick}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Minifie<img src={dndLogo} id="dnd-logo" alt="DnD"/>!
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
);

const HomePage = (props) => (
  <div style={{padding:4}}>
    <Grid container spacing={1} justify="center">
      <Grid item xs={10}>
        <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                What is MinifieDnD?
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                A simplified version of DnD 5E aiming to drastically cut down the Dungeon Master’s preparation and move the emphasis away from the nitty gritty mechanics and math to the roleplaying and exploration.
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={5}>
        <StepCard 
          image={testImage}
          title="1. World Building"
          body="First the Dungeon Master selects the setting and story which they would like to run"
          button1Text="Begin"
          button1Click={props.routeToWorldbuilding}/>
      </Grid>
      <Grid item xs={5}>
        <StepCard 
          image={testImage}
          title="2. Character Creation"
          body="Next the Players create select the characters which they would like to play"
          button1Text="Begin"
          button1Click={props.routeToCharacter}/>
      </Grid>
      <Grid item xs={10}>
        <StepCard 
          image={testImage}
          title="3. Running the Game"
          body="Following some simplified rules the game now runs"
          button1Text="Begin"/>
      </Grid>
    </Grid>
  </div>
);

const StepCard = (props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          image={props.image}
          alt="TestImage"
          height="140"
          title="TestImage"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.button1Click}>
          {props.button1Text}
        </Button>
      </CardActions>
    </Card>
  );
}

const MainApp = () => {
  const history = createBrowserHistory();

  const routeToCharacter = () => {
    history.push("/character");
  }
  const routeToWorldbuilding = () => {
    history.push("/worldbuilding");
  }
  return(
    <ThemeProvider theme={darkTheme}>
      <Header/>
      <div className="main-container">
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <HomePage 
              routeToCharacter={routeToCharacter}
              routeToWorldbuilding={routeToWorldbuilding}/>
            </Route>
            <Route path="/worldbuilding">
              <WorldbuildingPage/>
            </Route>
            <Route path="/character">
              <CharacterPage/>
            </Route>
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
    
  );
}

ReactDOM.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
