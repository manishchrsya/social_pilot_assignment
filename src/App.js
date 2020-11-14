import React from 'react';
import './App.css'

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import {Button} from '@material-ui/core';
import {Typography} from '@material-ui/core';
import Stage1 from './Components/Stage1/Stage1'
import Stage2 from './Components/Stage2/Stage2';
import Stage3 from './Components/Stage3/Stage3';


// const styles = theme => ({
//     root: {
//         width: '100%',
//     },
//     button: {
//         marginRight: theme.spacing.unit,
//     },
//     backButton: {
//         marginRight: theme.spacing.unit,
//     },
//     completed: {
//         display: 'inline-block',
//     },
//     instructions: {
//         marginTop: theme.spacing.unit,
//         marginBottom: theme.spacing.unit,
//     },
// });

function getSteps() {
    return ['Stage1', 'Stage2', 'Stage3'];
}

function getStepContent(step) {
   
    switch (step) {
        case 0:
            return (
              <div className='stage-data'>
                <Stage1 />
              </div>
                
            );
        case 1:
            return (
                
                <div className='stage-data'>
                  <Stage2 />
                </div>
            );
        case 2:
            return (
                
                <div className='stage-data'>
                  <Stage3/>
                </div>
            );
        default:
            return 'Unknown step';
    }
}

class App extends React.Component {
    state = {
        activeStep: 0,
        completed: new Set(),
        skipped: new Set(),
    };

    totalSteps = () => getSteps().length;

    isStepOptional = step => step === 4;

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleNext = () => {
        let activeStep;

        if (this.isLastStep() && !this.allStepsCompleted()) {
            // It's the last step, but not all steps have been completed
            // find the first step that has been completed
            const steps = getSteps();
            activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
        } else {
            activeStep = this.state.activeStep + 1;
        }
        this.setState({
            activeStep,
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleStep = step => () => {
        this.setState({
            activeStep: step,
        });
    };

    handleComplete = () => {
        // eslint-disable-next-line react/no-access-state-in-setstate
        const completed = new Set(this.state.completed);
        completed.add(this.state.activeStep);
        this.setState({
            completed,
        });

        /**
         * Sigh... it would be much nicer to replace the following if conditional with
         * `if (!this.allStepsComplete())` however state is not set when we do this,
         * thus we have to resort to not being very DRY.
         */
        if (completed.size !== this.totalSteps() - this.skippedSteps()) {
            this.handleNext();
        }
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
            completed: new Set(),
            skipped: new Set(),
        });
    };

    skippedSteps() {
        return this.state.skipped.size;
    }

    isStepSkipped(step) {
        return this.state.skipped.has(step);
    }

    isStepComplete(step) {
        return this.state.completed.has(step);
    }

    completedSteps() {
        return this.state.completed.size;
    }

    allStepsCompleted() {
        return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    }

    isLastStep() {
        return this.state.activeStep === this.totalSteps() - 1;
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        
        return (
            <div className='main-container' >
                <Stepper  activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const buttonProps = {};
                        if (this.isStepOptional(index)) {
                            buttonProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (
                            <Step key={label} {...props}>
                                <StepButton
                                    onClick={this.handleStep(index)}
                                    completed={this.isStepComplete(index)}
                                    {...buttonProps}
                                >
                                    {label}
                                </StepButton> 
                            </Step>
                        );
                    })}
                </Stepper>
                <div>
                    {this.allStepsCompleted() ? (
                        <div>
                            <Typography >
                                All steps completed - you&apos;re finished
                           </Typography>
                            <Button onClick={this.handleReset}>Reset</Button>
                        </div>
                    ) : (
                            <div>
                                <Typography >{getStepContent(activeStep)}</Typography>
                                <div className="text-center">
                                    
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        // className={classes.button}
                                    >
                                        Next
                                    </Button>
                                   
                                  
                                </div>
                            </div>
                        )}
                </div>
            </div>
        );
    }

}


// HorizontalNonLinearAlternativeLabelStepper.propTypes = {
//     classes: PropTypes.object,
// };

// export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);


export default App;

