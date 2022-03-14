import React, { PureComponent } from 'react';
import { MdArrowBack, MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import View from '../view';
import ProgressBar from '../progressbar';
import Steps, { Step } from './steps';
import Controls, { Control } from './controls';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step2 from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ArrowBack, Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const steps = [
  'Select',
  'Connect',
  'Send',
  'Receive',
];

const styles = theme => ({
  step_label_root: {
    marginTop: '8px !important',
  },
  wrapper: {
    minHeight: '500px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '600px',
    margin: '15px',
    boxShadow: '0px 0px 30px -6px rgba(0,0,0,0.52)',
    backgroundColor: p => (p.dark ? theme.colors.aeroBlue : '#fff'),
    flexDirection: 'column',
    // '@media (max-width: 425px)': {
    //   width: '100%',
    //   height: '100vh',
    // },
    '@media (min-width: 1500px)': {
      width: '600px',
      // height: '600px',
    },
    '@media (max-width: 500px)': {
      width: '100%',
      // height: '600px',
    },
  },
  progress: {
    width: '100%',
    height: '10%',
    backgroundColor: p => (p.dark ? theme.colors.aeroBlue : '#fff'),
    alignItems: 'center',
    marginTop: '16px',
  },
  content: {
    width: '100%',
    height: '75%',
  },
  controls: {
    width: '100%',
    height: '15%',
    backgroundColor: '#7ab251',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  backButton: {
    padding: '10px',
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  id: {
    color: 'gray',
    margin: '10px',
    fontSize: '20px',
    justifyContent: 'center',
  },
});

class StepsWizard extends PureComponent {
  constructor(props) {
    super(props);
    this.progressInterval = this.initProgress();
    this.state = {
      stage: this.props.stage,
      progress: this.progressInterval,
    };
  }

  static Steps = Steps;
  static Step = Step;
  static Controls = Controls;
  static Control = Control;

  initProgress = () => {
    return 100 / this.props.range;
  };

  nextStage = () => {
    if (this.state.progress !== 100) {
      this.setState(pre => ({
        stage: pre.stage + 1,
        progress: pre.progress + this.progressInterval,
      }));
    }
  };

  prevStage = () => {
    if (this.state.progress !== this.progress) {
      this.setState(pre => ({
        stage: pre.stage - 1,
        progress: pre.progress - this.progressInterval,
      }));
    }
  };

  render() {
    const { stage } = this.state;
    const { classes, onExit, range } = this.props;
    // console.log('stepwizard stage, range ', stage, range);
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        stage,
        range,
        nextStage: this.nextStage,
        style: classes,
        onExit: onExit,
      });
    });

    return (
      // <View className={classes.wrapper}>
      <Card 
        className={classes.wrapper}>
        <View className={classes.progress}>
          {onExit ? (
            stage !== range ? (
              // <MdArrowBack
              //   className={classes.backButton}
              //   onClick={() => (stage !== 1 ? this.prevStage() : onExit())}
              // />
              <IconButton aria-label="delete" size="large"
                onClick={() => (stage !== 1 ? this.prevStage() : onExit())}>
                <ArrowBack fontSize="inherit" />
              </IconButton>
            ) : (
              // <MdClose
              //   className={classes.backButton}
              //   onClick={() => onExit()}
              // />
              <IconButton aria-label="delete" size="large"
                onClick={() => onExit()}>
                <Close fontSize="inherit" />
              </IconButton>
            )
          ) : null}
          {/* <ProgressBar progress={this.state.progress} /> */}
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={stage} alternativeLabel>
              {steps.map((label) => (
                <Step2 key={label}>
                  <StepLabel classes={{ label: classes.step_label_root }}>{label}</StepLabel>
                </Step2>
              ))}
            </Stepper>
          </Box>
        </View>
        {this.props.id ? (
          <View className={classes.id}>ID: {this.props.id}</View>
        ) : null}
        {children}
      </Card>
      // </View>
    );
  }
}

StepsWizard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  id: PropTypes.string,
  onExit: PropTypes.func,
  onClick: PropTypes.func,
  await: PropTypes.bool,
  alertOnExit: PropTypes.bool,
  onExitmessage: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  stage: PropTypes.number,
  range: PropTypes.number,
  dark: PropTypes.bool,
};

export default injectSheet(styles)(StepsWizard);
