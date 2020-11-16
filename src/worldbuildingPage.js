import React from 'react';
import './index.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const neo4j = require('neo4j-driver')
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', '1234'))

const queries = {
    creatureStart: {
        creatures: '',
        locations: '',
        biomes: '',
        result: ''
    },
    biomeStart: {
        biomes: `MATCH (b:Biome) RETURN b AS n LIMIT 10`,
        locations: `MATCH (c1:Creature)-[:LIVES_IN]->(:Biome {name: $biome}) RETURN c1 AS n LIMIT 5`,//`MATCH (l:Location)-[:IS_IN]->(:Biome {name: $biome}) RETURN l AS n LIMIT 3`,
        result: `MATCH (c1:Creature)-[:LIVES_IN]->(:Location {name: $location})-[:IS_IN]->(:Biome {name: $biome})
                MATCH (c2:Creature)-[:LIVES_IN]->(:Location {name: $location})
                MATCH (c3:Creature)-[:LIVES_IN]->(:Biome {name: $biome})
                RETURN c1, c2, c3`
    },
    locationStart: {
        locations: '',
        biomes: '',
        result: ''
    }
}

const EntityList = (props) => {
    const [selectedIndex, setSelectedIndex] = React.useState();
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        console.log("EntityList->handleListItemClick CALLED");
        props.onSelect(props.items[index]);
    };

    // Default to Loading Message
    let result = (<div>Loading...</div>)
    // Was there an error om the query?
    if ( props.error ) {
        result = (<div>{ props.error.message }</div>)
    }
    else if ( props.items ) {
        result = (
            <List>
                {props.items.map((biome, index) => (
                    <ListItem
                        button
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        key={'biome'+index}
                    >
                        {biome}
                    </ListItem>
                ))}
            </List>
        );
    }
    return (
        <div>
            {result}
        </div>
    );
}

class SingleStep extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onChange();
    }

    render() {
        return(
            <Accordion
                expanded={this.props.expanded}
                disabled={this.props.disabled}
                onChange={this.props.onChange}
            >
                <AccordionSummary>
                    <Typography>{this.props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {this.props.children}
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    {this.props.onBack?
                    <Button size="small" onClick={this.props.onBack}>Back</Button>:<div/>
                    }
                    <Button
                        size="small"
                        color="primary"
                        onClick={this.props.onSubmit}
                        disabled={this.props.submitDisabled}
                    >Submit</Button>
                </AccordionActions>
            </Accordion>
        );
    }
}

SingleStep.defaultProps = {
    expanded: false,
    disabled: false,
    onChange: () => {}
}


function  WorldbuildingSteps() {
    const [selectedBiome, setSelectedBiome] = React.useState("");
    const [step1Records, setStep1Records] = React.useState([]);
    const [step2Records, setStep2Records] = React.useState([]);
    const [biomeListExpanded, setBiomeListExpanded] = React.useState(true);
    const [locationListExpanded, setLocationListExpanded] = React.useState(false);

    async function QueryGraph(query, params, set) {
        console.log("QueryGraph CALLED");
        const session = driver.session();
        //const tx = session.beginTransaction();
    
        const tx1 = session
            .run(query, params)
            .then((results) => {
                return results.records
            });
    
        //await tx.commit();
        set(await tx1);
        session.close();
    }

    const getBiomes = () => {
        QueryGraph(step1Query, {}, setStep1Records);
    }
    const submitBiome = () => {
        QueryGraph(step2Query, {biome: selectedBiome}, setStep2Records);
        setBiomeListExpanded(false);
        setLocationListExpanded(true);
    }
    const openBiomes = () => {
        setBiomeListExpanded(true);
        setLocationListExpanded(false);
    }

    const step1Query = queries.biomeStart.biomes;
    const step2Query = queries.biomeStart.locations;
    // const step3Query = queries.biomeStart.result;
    // const step3Params = {biome:biomeName, location:"River"}
    // const { step3Error, step3Records } = useReadCypher(step3Query, step3Params);

    const step1Items = step1Records?step1Records.map((biome) => (biome.get('n').properties.name)):[];
    const step2Items = step2Records?step2Records.map((location) => (location.get('n').properties.name)):[];

    return (
        <div>
            <SingleStep
                title="Select A Biome"
                expanded={biomeListExpanded}
                onChange={getBiomes}
                onSubmit={submitBiome}
                submitDisabled={selectedBiome == ""}
            >
                <EntityList items={step1Items} onSelect={setSelectedBiome}/>
            </SingleStep>
            <SingleStep
                title="Select A Location"
                expanded={locationListExpanded}
                disabled={selectedBiome == ""}
                onBack={openBiomes}
            >
                <EntityList items={step2Items}/>
            </SingleStep>
            {/* <SingleStep title="Resulting World">
                <EntityList records={step3Records} error={step3Error}/>
            </SingleStep> */}
        </div>
    );
}


function WorldbuildingPage(props) {  
    return (
        //<TestFunct></TestFunct>
        <React.StrictMode>
            <Grid container justify="center">
                <Grid item sm={10}>
                    <WorldbuildingSteps/>
                </Grid>
            </Grid>
        </React.StrictMode>
    );
}

// class Form extends React.Component {
// 	state = { userName: '' };
// 	handleSubmit = async (event) => {
//   	event.preventDefault();
//     const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
//     this.props.onSubmit(resp.data);
//     this.setState({ userName: '' });
//   };
// 	render() {
//   	return (
//     	<form onSubmit={this.handleSubmit}>
//     	  <input 
//           type="text" 
//           value={this.state.userName}
//           onChange={event => this.setState({ userName: event.target.value })}
//           placeholder="GitHub username" 
//           required 
//         />
//         <button>Add card</button>
//     	</form>
//     );
//   }
// }

/* <Grid item sm={3}>
    <input
    type ="text"
    value={creatureName}
    onChange={event => setCreatureName(event.target.value)}></input>
</Grid>
<Grid item sm={1}>
    <button onClick={submit}>Search</button>
</Grid> */

export default WorldbuildingPage;