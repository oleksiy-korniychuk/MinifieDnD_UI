import React, { useEffect } from 'react';
import '../index.css';
import Grid from '@material-ui/core/Grid';
import {
    Switch,
    Route
} from "react-router-dom";
import { EntityList, SingleStep } from '../Shared/AccordionSteps';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@material-ui/core';
import { Typography, Divider, Button } from '@material-ui/core'

// CONSTANTS
const axios = require('axios').default;
const NUM_BIOMES = 5;
const NUM_LOCATIONS = 3;
const NUM_CREATURES = 5;

// COMPONENTS
function  WorldbuildingSteps() {
    return (
        <div>
            <Switch>
                <Route exact path="/worldbuilding">
                    <Flow2 />
                </Route>
                <Route path="/worldbuilding/flow2">
                    <h>TEST FLOW2</h>
                </Route>
            </Switch>
        </div>
    );
}

function Flow2() {
    const [biomes, setBiomes] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [selectedBiome, setSelectedBiome] = React.useState("");
    const [selectedLocation, setSelectedLocation] = React.useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                "http://minifiednd.com:8880/minifiednd_api/allBiomes",
            );
            setBiomes(result.data);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                "http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome,
            );
            setLocations(result.data);
        };

        fetchData();
    }, [selectedBiome]);

    return (
        <div>
            <BiomeList biomes={biomes} set={setSelectedBiome}/>
            {selectedBiome}
            <LocationList locations={locations} set={setSelectedLocation} />
            {selectedLocation}
        </div>
    );
}

function BiomeList(props) {
    const [selectedBiomeIndex, setSelectedBiomeIndex] = React.useState(null);

    const setBiome = () => {
        props.set(props.biomes[selectedBiomeIndex].name);
    }


    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography>Select A Biome ...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EntityList items={props.biomes.map((biome) => biome.name)} onSelect={setSelectedBiomeIndex} selectedIndex={selectedBiomeIndex}/>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={setBiome}
                        disabled={false}
                    >Submit</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

function LocationList(props) {
    const [selectedLocationIndex, setSelectedLocationIndex] = React.useState(null);

    const setLocation = () => {
        props.set(props.locations[selectedLocationIndex].name);
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography>Select A Location ...</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EntityList items={props.locations.map((location) => location.name)} onSelect={setSelectedLocationIndex} selectedIndex={selectedLocationIndex}/>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        size="small"
                        color="primary"
                        onClick={setLocation}
                        disabled={false}
                    >Submit</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

function WorldbuildingPage() {  
    return (
        <React.StrictMode>
            <Grid container justify="center">
                <Grid item sm={10}>
                    <WorldbuildingSteps/>
                </Grid>
            </Grid>
        </React.StrictMode>
    );
}

export default WorldbuildingPage;