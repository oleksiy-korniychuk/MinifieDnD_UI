import React, { useEffect } from 'react';
import '../index.css';
import { EntityList } from '../Shared/AccordionSteps';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@material-ui/core';
import { Typography, Divider, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

// CONSTANTS
const axios = require('axios').default;

// COMPONENTS
function Flow2() {
    const [biomes, setBiomes] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [creatures, setCreatures] = React.useState([]);
    const [selectedBiome, setSelectedBiome] = React.useState("");
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [componentDidMount, setComponentDidMount] = React.useState(false);

    const submitBiome = (biome) => {
        setSelectedBiome(biome);
        setSelectedLocation("");
        setCreatures([]);
    }

    const fetchData = async (endpoint, setData) => {
        const result = await axios(endpoint, );
        setData(result.data);
    }

    useEffect(() => {
        setComponentDidMount(true);
        fetchData("http://minifiednd.com:8880/minifiednd_api/allBiomes", setBiomes);
    }, []);

    useEffect(() => {
        if(componentDidMount)
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome, setLocations);
    }, [selectedBiome]);

    useEffect(() => {
        if(componentDidMount && selectedLocation !== "")
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&location=" + selectedLocation, setCreatures);
    }, [selectedLocation]);

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item sm={6}>
                    <BiomeList biomes={biomes} set={submitBiome} />
                </Grid>
                <Grid item sm={6}>
                    <LocationList locations={locations} set={setSelectedLocation} />
                </Grid>
                <Grid item sm={12}>
                    <CreatureList creatures={creatures} />
                </Grid>
            </Grid>
        </div>
    );
}

function BiomeList(props) {
    const [selectedBiomeIndex, setSelectedBiomeIndex] = React.useState(null);
    const [selectedBiome, setSelectedBiome] = React.useState("");

    const setBiome = () => {
        let newName = props.biomes[selectedBiomeIndex].name;
        setSelectedBiome(newName);
        props.set(newName);
    }


    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography>Select A Biome: {selectedBiome}</Typography>
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
                        disabled={selectedBiomeIndex === null}
                    >Submit</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

function LocationList(props) {
    const [selectedLocationIndex, setSelectedLocationIndex] = React.useState(null);
    const [selectedLocation, setSelectedLocation] = React.useState("");

    useEffect(() => {
        setSelectedLocationIndex(null);
    }, [props.locations]);

    const setLocation = () => {
        let newName = props.locations[selectedLocationIndex].name;
        props.set(newName);
        setSelectedLocation(newName);
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography>Select A Location: {selectedLocation}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EntityList items={props.locations.map((location) => location.name)} onSelect={setSelectedLocationIndex} selectedIndex={selectedLocationIndex}/>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        size="small"
                        onClick={() => {}}
                        disabled={false}
                    >Back</Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={setLocation}
                        disabled={selectedLocationIndex === null}
                    >Submit</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

function CreatureList(props) {
    return (
        <div>
            <Accordion>
                <AccordionSummary>
                    <Typography>Creatures:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EntityList items={props.creatures.map((creature) => creature.name)} onSelect={()=>{}} />
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button
                        size="small"
                        onClick={() => {}}
                        disabled={false}
                    >Back</Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {}}
                        disabled={false}
                    >Refresh</Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}

export { Flow2 };