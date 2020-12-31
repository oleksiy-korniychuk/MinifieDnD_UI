import React, { useEffect } from 'react';
import '../index.css';
import Grid from '@material-ui/core/Grid';
//import { Flow2 } from './Flow2';
import {
    Router,
    Switch,
    Route
} from "react-router-dom";

const axios = require('axios').default;
// NEO4J DRIVER
const neo4j = require('neo4j-driver')
const driver = neo4j.driver('bolt://minifiednd.com:7687', neo4j.auth.basic('neo4j', 'goblinMonkeyBaby'))

// CONSTANTS
const NUM_BIOMES = 5;
const NUM_LOCATIONS = 3;
const NUM_CREATURES = 5;
const queries = {
    creatureStart: {
        creatures: '',
        locations: '',
        biomes: '',
        result: ''
    },
    biomeStart: {
        biomes: `MATCH (biome:Biome) RETURN biome`,
        locations: `MATCH (location:Location)-[:IS_IN]->(:Biome {name: $biome}) RETURN location`,
        result: `
MATCH (c1:Creature)-[:LIVES_IN]->(location:Location {name: $location})-[:IS_IN]->(biome:Biome {name: $biome})
RETURN c1 AS creature
UNION MATCH (c2:Creature)-[:LIVES_IN]->(location:Location {name: $location})
RETURN c2 AS creature
UNION MATCH (c3:Creature)-[:LIVES_IN]->(biome:Biome {name: $biome})
RETURN c3 AS creature
        `
    },
    locationStart: {
        locations: '',
        biomes: '',
        result: ''
    }
}


// HELPER FUNCTIONS
function randomSubset(array, size) {
    let used = [], subset = [], index;
    const arrayLength = array.length;
    if(size > arrayLength) {
        console.log("ERROR: subset cannot be longer than array", array.length, size);
        return;
    }
    while(size > 0) {
        do {
            index = Math.floor(arrayLength*Math.random());
        } while(used.includes(index));
        used.push(index);
        subset.push(array[index]);
        size--;
    }
    return subset;
}

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

    useEffect(async () => {
        const fetchData = async () => {
            const result = await axios(
                "http://minifiednd.com:8880/minifiednd_api/allBiomes",
            );
            setBiomes(result.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            {biomes.map(biome => <h1>{biome.name}</h1>)}
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