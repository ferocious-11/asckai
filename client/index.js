import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import store from './stores/clientStore.js';

import Routes from './routes.js';

render(
    <Provider store={store}>
        <Router history={browserHistory}>{Routes}</Router>
    </Provider>,
    document.getElementById('root')
);
