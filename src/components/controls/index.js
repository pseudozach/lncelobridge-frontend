import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { MdArrowForward } from 'react-icons/md';
import View from '../view';
import { Box } from '@mui/system';
import { Alert, Button, CircularProgress } from '@mui/material';
import NavigateNext from '@mui/icons-material/NavigateNext';
// import {
//   // getCurrencyName,
//   // getSampleAddress,
//   // getNetwork,
//   connectWallet,
// } from '../../utils';

const styles = theme => ({
  greenman: {
    backgroundColor: '#45665b !important',
    '&:hover': {
      backgroundColor: '#649384 !important'
    },
  },
  wrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid #45665b',
    // backgroundColor: p => (p.loading ? '#4A4A4A' : 'none'),
    backgroundColor: 'white',
    cursor: 'initial',
  },
  error: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
  controls: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  text: {
    color: '#fff',
    fontWeight: '300',
    fontSize: p => (p.mobile ? '20px' : '25px'),
  },
  errorCommand: {
    paddingRight: '10px',
    color: '#fff',
    fontSize: p => (p.mobile ? '20px' : '25px'),
  },
  nextIcon: {
    paddingRight: '10px',
    height: '30px',
    width: '30px',
    color: '#fff',
  },
});

// TODO: refactor to use render props due to complexity
const Controls = ({
  classes,
  text,
  onPress,
  error,
  errorText,
  errorAction,
  errorRender,
  loading,
  loadingText,
  loadingStyle,
  loadingRender,
}) => {
  const loadingStyleSelect = loadingStyle ? loadingStyle : classes.text;
  const loadingTextSelect = loadingText ? loadingText : text;
  console.log('loading: ', loadingText, loading, loadingRender);
  console.log('text: ', text, errorText);
  let showProgress = false;
  if(loadingText && (loadingText.includes('Waiting for invoice to be paid...') ||
    loadingText.includes('Waiting for confirmation...'))) {
    showProgress = true;
  }

  return (
    <View
      className={error ? classes.error : classes.wrapper}
      // onClick={loading || error ? undefined : () => onPress()}
    >
      {/* <View className={classes.controls}>
        {error ? (
          <h1 className={classes.text}> {errorText} </h1>
        ) : (
          <h1 className={loading ? loadingStyleSelect : classes.text}>
            {loading ? loadingTextSelect : text}
          </h1>
        )}
      </View> */}
      {/* {error ? (
        errorRender ? (
          errorRender(classes.errorCommand, errorAction)
        ) : errorAction ? (
          <span className={classes.errorCommand} onClick={() => errorAction()}>
            Retry
          </span>
        ) : null
      ) : loading && loadingRender ? (
        loadingRender()
      ) : (
        <MdArrowForward className={classes.nextIcon} />
      )} */}

      <Box
        sx={{display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center', }}
      >
        {/* <Button
          variant="outlined"
          // className={classes.contractButton}
          text={'Connect Wallet'}
          sx={{ margin: 2, }}
          onClick={async () => {
            let w3 = await connectWallet();
            console.log('onpress account ', w3);
            // this.onChange(w3.account, false);
            document.getElementById('addressTextfield').value = w3.account;
          }}
        >{'Connect Wallet'}
        </Button> */}
        {(error && errorRender) && <Alert severity="error" sx={{flex: 1, mx: 1,}} >{errorRender(classes.errorCommand, errorAction)}</Alert>}
        {showProgress && <CircularProgress sx={{m: 2,}} />}
        {!showProgress && <Button variant="contained" size="large" endIcon={<NavigateNext />}
          sx={{ margin: 2, }}
          // className={classes.greenman}
          disabled={(error || errorRender || loading)}
          onClick={() => onPress()}
        >
          {/* {loading ? loadingTextSelect : text} */}
          Next
        </Button>}
      </Box>

    </View>
  );
};

Controls.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string,
  error: PropTypes.bool,
  errorAction: PropTypes.func,
  errorText: PropTypes.string,
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  loadingStyle: PropTypes.string,
  loadingRender: PropTypes.func,
  errorRender: PropTypes.node,
  mobile: PropTypes.bool,
};

export default injectSheet(styles)(Controls);
