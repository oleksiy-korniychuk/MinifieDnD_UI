import React from 'react';
import '../index.css';
import Grid from '@material-ui/core/Grid';
import {
    Switch,
    Route
} from "react-router-dom";
import { Flow2, Flow2_Redesign } from "./Flow2"

// COMPONENTS
function  WorldbuildingSteps() {
    return (
        <div>
            <Switch>
                <Route exact path="/worldbuilding">
                    <Flow2 />
                </Route>
                <Route path="/worldbuilding/flow2">
                    <Flow2_Redesign />
                </Route>
            </Switch>
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