import React, { Component } from 'react';
import { Route } from 'react-router';

import { indigo900 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import HomePage from './components/HomePage/HomePage.js';

import styles from './base.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#607D8B',
    }
});
class Main extends Component {
    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            <HomePage />
        </MuiThemeProvider>;
    }
}


const routes = (
    <Route path='/' name='root' component={Main}>
        {/* Add more paths here */}
    </Route>
);

export default routes;
