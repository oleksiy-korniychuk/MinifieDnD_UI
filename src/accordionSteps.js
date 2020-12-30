import React from 'react';
import './index.css';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';

function EntityList(props) {
    // Default to Loading Message
    let result = (<div>Loading...</div>)
    if ( props.items ) {
        result = (
            <List>
                {props.items.map((entity, index) => (
                    <ListItem
                        button
                        selected={props.selectedIndex === index}
                        onClick={() => props.onSelect(index)}
                        key={entity+index}
                    >
                        {entity}
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
        this.props.onMount();
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
                    {this.props.onSubmit?
                    <Button
                        size="small"
                        color="primary"
                        onClick={this.props.onSubmit}
                        disabled={this.props.submitDisabled}
                    >Submit</Button>:<div/>
                    }
                </AccordionActions>
            </Accordion>
        );
    }
}

SingleStep.defaultProps = {
    expanded: false,
    disabled: false,
    onMount: () => {}
}

export { EntityList, SingleStep }
export default SingleStep;