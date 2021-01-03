import React, { useEffect } from 'react';
import '../index.css';
import { EntityList, SingleStep } from '../Shared/AccordionSteps';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@material-ui/core';
import { Typography, Divider, Button } from '@material-ui/core'

// CONSTANTS
const axios = require('axios').default;

// COMPONENTS
function Flow2() {
    const [biomes, setBiomes] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [creatures, setCreatures] = React.useState([]);
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

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                "http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&location=" + selectedLocation,
            );
            setCreatures(result.data);
        };

        fetchData();
    }, [selectedBiome, selectedLocation]);

    return (
        <div>
            <BiomeList biomes={biomes} set={setSelectedBiome}/>
            {selectedBiome}
            <LocationList locations={locations} set={setSelectedLocation} />
            {selectedLocation}
            <CreatureList creatures={creatures} />
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
                        onClick={() => {}}
                        disabled={false}
                    >Back</Button>
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