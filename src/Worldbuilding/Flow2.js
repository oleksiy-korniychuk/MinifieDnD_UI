import React, { useEffect } from 'react';
import '../index.css';
import { EntityList } from '../Shared/AccordionSteps';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions } from '@material-ui/core';
import { Typography, Divider, Button } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';

// Redesign Imports
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepButton from '@material-ui/core/StepButton';

// CONSTANTS
const axios = require('axios').default;
const NUM_BIOMES = 5;
const NUM_LOCATIONS = 8;
const NUM_CREATURES = 20;

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
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&random=" + NUM_LOCATIONS, setLocations);
    }, [selectedBiome]);

    useEffect(() => {
        if(componentDidMount && selectedLocation !== "")
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&location=" + selectedLocation + "&random=" + NUM_CREATURES, setCreatures);
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

function Flow2_Redesign() {
    const [biomes, setBiomes] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [creatures, setCreatures] = React.useState([]);
    const [selectedBiome, setSelectedBiome] = React.useState("");
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [componentDidMount, setComponentDidMount] = React.useState(false);

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };

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
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&random=" + NUM_LOCATIONS, setLocations);
    }, [selectedBiome]);

    useEffect(() => {
        if(componentDidMount && selectedLocation !== "")
            fetchData("http://minifiednd.com:8880/minifiednd_api/flow2?biome=" + selectedBiome + "&location=" + selectedLocation + "&random=" + NUM_CREATURES, setCreatures);
    }, [selectedLocation]);


    return (
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography>All steps completed</Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography>{getStepContent(activeStep)}</Typography>
                <Grid container spacing={1}>
                    <Grid item sm={4}>
                        <BiomeList biomes={biomes} set={submitBiome} />
                    </Grid>
                    <Grid item sm={4}>
                        <LocationList locations={locations} set={setSelectedLocation} />
                    </Grid>
                    <Grid item sm={4}>
                        <CreatureList creatures={creatures} />
                    </Grid>
                </Grid>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
    );

    return (
        <div>
            
        </div>
    );
}

function getSteps() {
    return ['Select a biome', 'Select a location', 'Browse Creatures'];
}

function getStepContent(step) {
    switch (step) {
      case 0:
        return 'Step 1: Choose your desired location. Feel free to explore!';
      case 1:
        return 'Step 2: Here are the locations avalible in your selected biome. Choose one you like.';
      case 2:
        return 'Step 3: Boom! These are the creatures that live in your selected biome and location. Let the adventure begin!';
      default:
        return 'Unknown step';
    }
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

export { Flow2, Flow2_Redesign };