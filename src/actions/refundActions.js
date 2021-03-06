import axios from 'axios';
import qrcodeParser from 'qrcode-parser';
import { ECPair, address, Transaction } from 'bitcoinjs-lib';
import { constructRefundTransaction, detectSwap } from 'boltz-core';
import { boltzApi } from '../constants';
import * as actionTypes from '../constants/actions';
import {
  getHexBuffer,
  getNetwork,
  getFeeEstimation,
  getExplorer,
  refundFunds,
  refundTokens,
} from '../utils';

const verifyRefundFile = (fileJSON, keys) => {
  const verify = keys.every(key =>
    Object.prototype.hasOwnProperty.call(fileJSON, key)
  );

  return verify;
};

export const completeRefund = () => {
  return {
    type: actionTypes.COMPLETE_REFUND,
  };
};

export const setRefundFile = file => {
  return dispatch => {
    qrcodeParser(file).then(res => {
      const fileJson = JSON.parse(res.data);

      const verifyFile = verifyRefundFile(fileJson, [
        'currency',
        'redeemScript',
        'privateKey',
        'timeoutBlockHeight',
      ]);

      dispatch({
        type: actionTypes.SET_REFUND_FILE,
        payload: verifyFile ? fileJson : {},
      });
    });
  };
};

export const setTransactionHash = hash => ({
  type: actionTypes.SET_REFUND_TXHASH,
  payload: hash,
});

export const setDestinationAddress = address => ({
  type: actionTypes.SET_REFUND_DESTINATION,
  payload: address,
});

export const setRefundTransactionHash = hash => ({
  type: actionTypes.SET_REFUND_TRANSACTION_HASH,
  payload: hash,
});

export const refundRequest = () => ({
  type: actionTypes.REFUND_REQUEST,
});

export const refundResponse = (success, response) => ({
  type: actionTypes.REFUND_RESPONSE,
  payload: {
    success,
    response,
  },
});

const createRefundTransaction = (
  refundFile,
  response,
  destinationAddress,
  currency,
  feeEstimation
) => {
  const redeemScript = getHexBuffer(refundFile.redeemScript);
  const lockupTransaction = Transaction.fromHex(response.data.transactionHex);

  // TODO: make sure the provided lockup transaction hash was correct and show more specific error if not
  return {
    refundTransaction: constructRefundTransaction(
      [
        {
          redeemScript,
          txHash: lockupTransaction.getHash(),
          keys: ECPair.fromPrivateKey(getHexBuffer(refundFile.privateKey)),
          ...detectSwap(redeemScript, lockupTransaction),
        },
      ],
      address.toOutputScript(destinationAddress, getNetwork(currency)),
      refundFile.timeoutBlockHeight,
      feeEstimation[currency]
    ),
    lockupTransactionId: lockupTransaction.getId(),
  };
};

export const dummyAction = () => {
  console.log('dummyAction')
}

export const startRefund = (
  refundFile,
  transactionHash,
  destinationAddress,
  // cb
) => {
  console.log(`startRefund: `, refundFile, transactionHash, destinationAddress);

  if (refundFile.currency == 'CELO') {
    refundFunds(refundFile.swapInfo, refundFile.swapResponse);
  } else {
    refundTokens(refundFile.swapInfo, refundFile.swapResponse);
  }

  
  // const url = `${boltzApi}/gettransaction`;
  // const currency = refundFile.currency;

  // return dispatch => {
  //   dispatch(refundRequest());
  //   axios
  //     .post(url, {
  //       currency,
  //       transactionId: transactionHash,
  //     })
  //     .then(response => {
  //       dispatch(
  //         getFeeEstimation(feeEstimation => {
  //           const {
  //             refundTransaction,
  //             lockupTransactionId,
  //           } = createRefundTransaction(
  //             refundFile,
  //             response,
  //             destinationAddress,
  //             currency,
  //             feeEstimation
  //           );

  //           dispatch(setRefundTransactionHash(refundTransaction.getId()));
  //           dispatch(
  //             broadcastRefund(
  //               currency,
  //               refundTransaction.toHex(),
  //               lockupTransactionId,
  //               () => {
  //                 dispatch(refundResponse(true, response.data));

  //                 cb();
  //               }
  //             )
  //           );
  //         })
  //       );
  //     })
  //     .catch(error => {
  //       const message = error.response.data.error;

  //       window.alert(`Failed to refund swap: ${message}`);
  //       dispatch(refundResponse(false, message));
  //     });
  // };
};

// const broadcastRefund = (currency, transactionHex, lockupTransactionId, cb) => {
//   const url = `${boltzApi}/broadcasttransaction`;
//   return dispatch => {
//     dispatch(refundRequest());
//     axios
//       .post(url, {
//         currency,
//         transactionHex,
//       })
//       .then(() => cb())
//       .catch(response => {
//         const error = response.response.data.error;
//         let message = `Failed to broadcast refund transaction: ${error}`;

//         if (
//           error ===
//           'please wait until your lockup transaction has 10 confirmations before you try to refund'
//         ) {
//           message +=
//             '. Click OK to open the lockup transaction in a block explorer';

//           const openExplorer = window.confirm(message);
//           if (openExplorer) {
//             window.open(
//               `${getExplorer(currency)}/${lockupTransactionId}`,
//               '_blank'
//             );
//           }
//         } else {
//           window.alert(message);
//         }
//         dispatch(refundResponse(false, message));
//       });
//   };
// };
