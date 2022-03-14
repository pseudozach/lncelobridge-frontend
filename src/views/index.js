import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
// , preset, jss
// import { ThemeProvider } from 'react-jss';
import theme2 from '../constants/theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { deepmerge } from '@mui/utils';
import store from '../state';
import 'react-notifications-component/dist/theme.css';
import { Router, Route, Switch } from 'react-router-dom';
import * as routes from '../constants/routes';
import BackGround from '../components/background';
import history from '../constants/history';

const LandingPage = lazy(() => import('./landingpage'));
const Faq = lazy(() => import('./faq'));
const Swap = lazy(() => import('./swap'));
const Refund = lazy(() => import('./refund'));
const ReverseSwap = lazy(() => import('./reverse'));
const ReverseSwapTimelockExpired = lazy(() => import('./reversetimelock'));

// const theme = createTheme(deepmerge({
//   palette: {
//     primary: {
//       main: '#304740'
//     },
//     secondary: {
//       main: '#303b47'
//     }
//   }
// }, theme2));

const theme = createTheme({
  palette: {
    primary: {
      main: '#304740'
    },
    secondary: {
      main: '#303b47'
    }
  }
}, theme2);

// Object.assign(newtheme, theme);
// console.log('extended theme: ', theme, theme2);

// jss.setup(preset);
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<BackGround showFooter={false} />}>
          <Router history={history}>
            <Switch>
              <Route exact path={routes.home} component={LandingPage} />
              <Route exact path={routes.faq} component={Faq} />
              <Route exact path={routes.swap} component={Swap} />
              <Route exact path={routes.refund} component={Refund} />
              <Route exact path={routes.reverseSwap} component={ReverseSwap} />
              <Route
                exact
                path={routes.reverseExpired}
                component={ReverseSwapTimelockExpired}
              />
              <Route path={'*'} component={LandingPage} />
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
