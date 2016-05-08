import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import store from './stores/clientStore.js';

import Routes from './routes.js';

injectTapEventPlugin();

render(
    <Provider store={store}>
        <Router history={browserHistory}>{Routes}</Router>
    </Provider>,
    document.getElementById('root')
);
