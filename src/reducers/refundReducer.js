import * as actionTypes from '../constants/actions';

export const initialState = {
  isFetching: false,
  refundFile: {},
  transactionHash: '123',
  destinationAddress: null,
  refundTransaction: null,
  refundTransactionHash: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REFUND_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case actionTypes.REFUND_RESPONSE:
      return {
        ...state,
        isFetching: false,
      };

    case actionTypes.SET_REFUND_FILE:
      return {
        ...state,
        refundFile: action.payload,
      };

    case actionTypes.SET_REFUND_TXHASH:
      return {
        ...state,
        transactionHash: action.payload,
      };

    case actionTypes.SET_REFUND_DESTINATION:
      return {
        ...state,
        destinationAddress: action.payload,
      };

    case actionTypes.SET_REFUND_TRANSACTION_HASH:
      return {
        ...state,
        refundTransactionHash: action.payload,
      };

    case actionTypes.COMPLETE_REFUND:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
