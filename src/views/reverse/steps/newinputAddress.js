import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { address } from 'bitcoinjs-lib';
import View from '../../../components/view';
import InputArea from '../../../components/inputarea';
import {
  getCurrencyName,
  getSampleAddress,
  getNetwork,
  connectWallet,
} from '../../../utils';
import Button from '../../../components/button';
// import { FaWallet } from 'react-icons/fa';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const inputAddressStyles = () => ({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '30px',
    '@media (max-width: 425px)': {
      fontSize: '16px',
    },
    textAlign: 'center',
    marginBlockEnd: '0',
  },
  contractButton: {
    background: 'black',
    margin: '4px',
    borderRadius: '5px',
  },
});

class StyledInputAddress extends React.Component {
  state = {
    error: false,
    ua: null,
  };

  onChange = input => {
    // console.log('inputaddress input: ', input);
    const { onChange, swapInfo } = this.props;
    const swapAddress = input.trim();
    // .toLowerCase()
    console.log('inputaddress onchange: ', swapAddress);

    let error = true;

    if (input !== '') {
      try {
        address.toOutputScript(swapAddress, getNetwork(swapInfo.quote));
        error = false;
        // eslint-disable-next-line no-empty
      } catch (error) {}
    } 
    if (swapAddress.includes('0x')) {
      error = false
      this.setState({ ua: swapAddress });
    }

    // console.log('inputaddress setstate ', swapAddress, error, onChange);
    this.setState({ error });
    onChange(swapAddress, error);
  };

  render() {
    const { error, ua } = this.state;
    const { classes, swapInfo } = this.props;

    if(localStorage.getItem('ua') && !ua) {
      this.onChange(localStorage.getItem('ua'));
    }

    return (
      <View className={classes.wrapper}>
      {/* <Card 
        className={classes.wrapper}> */}

        {/* <p className={classes.title}>
          Paste or scan a <b>{getCurrencyName(swapInfo.quote)}</b> address to
          which you want to receive <br /> {'OR'}
        </p> */}

        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField 
            fullWidth 
            label="Address" 
            defaultValue={localStorage.getItem('ua') || `EG: ${getSampleAddress(swapInfo.quote)}`}
            id="addressTextfield" 
            disabled
            placeholder={`EG: ${getSampleAddress(swapInfo.quote)}`}
            onChange={this.onChange}
            error={error}
            />
        </Box>

        {/* <Button
          className={classes.contractButton}
          text={'Connect Wallet'}
          onPress={async () => {
            let w3 = await connectWallet();
            console.log('onpress account ', w3);
            this.onChange(w3.account, false);
            document.getElementsByTagName('textarea')[0].value = w3.account;
          }}
        >
        </Button> */}
        {/* <InputArea
          width={600}
          autoFocus={true}
          height={150}
          error={error}
          showQrScanner={true}
          onChange={this.onChange}
          placeholder={`${getSampleAddress(swapInfo.quote)}`}
        /> */}
      {/* </Card> */}
      </View>
    );
  }
}

StyledInputAddress.propTypes = {
  classes: PropTypes.object.isRequired,
  swapInfo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

const InputAddress = injectSheet(inputAddressStyles)(StyledInputAddress);

export default InputAddress;
