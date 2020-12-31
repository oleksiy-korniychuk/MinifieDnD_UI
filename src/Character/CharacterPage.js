import React from 'react';
import '../index.css';
import testImage2 from '../assets/DND_Art5.png';
import testImage3 from '../assets/DND_Art8.png';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'


function CharacterPage(props) {
    return (
        <Grid container item spacing={1} justify="center" id="character-page">
          <Grid item sm={5} md={5} lg={3}>
            <CharacterCard profileImage={testImage2}/>
          </Grid>
          <Grid item sm={5} md={5} lg={3}>
            <CharacterCard profileImage={testImage3}/>
          </Grid>
          <Grid item sm={5} md={5} lg={3}>
            <CharacterCard profileImage={testImage3}/>
          </Grid>
          <Grid item sm={5} md={5} lg={3}>
            <CharacterCard profileImage={testImage2}/>
          </Grid>
        </Grid>
    );
}

function CharacterCard(props) {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Joshua the Flaming Swordsman
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={props.profileImage}
          alt="TestImage"
          height="300"
          title="TestImage"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          A scrawny knight who thinks himself a noble and courageous hero.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Typography variant="body1" componet="p">More</Typography>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              <strong>Race:</strong> Human<br/>
              <strong>Size:</strong> Medium<br/>
              <strong>Motivation:</strong> Hates magic users; Greedy for gold; fuck bitches<br/>
              <strong>Quirk:</strong> Left eye twitches; heavy limp on the right leg; tends to repeat phrases<br/>
              <strong>Special Items:</strong> Flaming Sword<br/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
}

export default CharacterPage;