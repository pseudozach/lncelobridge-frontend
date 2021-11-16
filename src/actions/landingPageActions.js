import axios from 'axios';
import { boltzApi } from '../constants';
import { splitPairId } from '../utils';
import * as actionTypes from '../constants/actions';

export const pairsRequest = () => ({
  type: actionTypes.PAIRS_REQUEST,
});

export const pairsResponse = data => ({
  type: actionTypes.PAIRS_RESPONSE,
  payload: data,
});

export const loadingResourceError = message => ({
  type: actionTypes.RESOURCE_ERROR,
  payload: message,
});

const parseCurrencies = pairs => {
  const currencies = [];

  const pushCurrency = currency => {
    if (!currencies.includes(currency)) {
      if(currency === "BTC") {
        if(!currencies.includes("BTC ⚡")) {
          currencies.push(`${currency} ⚡`);
        }
      } else {
        currencies.push(currency);
      }
    }
  };

  Object.keys(pairs).forEach(id => {
    const { base, quote } = splitPairId(id);

    pushCurrency(base);
    pushCurrency(quote);
  });

  return currencies;
};

const parseRates = pairs => {
  const rates = {};

  Object.keys(pairs).forEach(id => {
    const pair = pairs[id];

    // Set the rate for a sell order
    rates[id] = {
      pair: id,
      rate: pair.rate,
      orderSide: 'sell',
    };

    // And for a buy order
    const { base, quote } = splitPairId(id);

    if (base !== quote) {
      rates[`${quote}/${base}`] = {
        pair: id,
        rate: 1 / pair.rate,
        orderSide: 'buy',
      };
    }
  });

  return rates;
};

const parseLimits = (pairs, rates) => {
  const limits = {};

  Object.keys(pairs).forEach(id => {
    const pair = pairs[id];
    const { base, quote } = splitPairId(id);

    if (base !== quote) {
      const reverseId = `${quote}/${base}`;
      const reverseRate = rates[reverseId].rate;

      limits[reverseId] = pair.limits;

      limits[id] = {
        minimal: Math.round(pair.limits.minimal * reverseRate),
        maximal: Math.round(pair.limits.maximal * reverseRate),
      };
    } else {
      limits[id] = pair.limits;
    }
  });

  return limits;
};

const parseFees = pairs => {
  const minerFees = {};
  const percentages = {};

  Object.keys(pairs).forEach(id => {
    const fees = pairs[id].fees;
    const percentage = fees.percentage / 100;

    const { base, quote } = splitPairId(id);

    percentages[id] = percentage;
    minerFees[base] = fees.minerFees.baseAsset;

    if (base !== quote) {
      percentages[`${quote}/${base}`] = percentage;

      minerFees[quote] = fees.minerFees.quoteAsset;
    }
  });

  return {
    minerFees,
    percentages,
  };
};

export const getPairs = () => {
  const url = `${boltzApi}/getpairs`;

  return dispatch => {
    dispatch(pairsRequest());
    axios
      .get(url)
      .then(response => {
        const { warnings, pairs } = response.data;

        const currencies = parseCurrencies(pairs);

        const rates = parseRates(pairs);
        const limits = parseLimits(pairs, rates);

        const fees = parseFees(pairs);

        dispatch(
          pairsResponse({
            warnings,

            fees,
            rates,
            limits,
            currencies,
          })
        );
      })
      .catch(error => {
        const errorMessage = error.toString();
        dispatch(
          loadingResourceError({
            message: errorMessage,
            title: 'Could not get rates',
          })
        );
      });
  };
};
