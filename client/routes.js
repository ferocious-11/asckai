import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import HomePage from './components/HomePage/HomePage.js';
import MenuPage from './components/MenuPage/MenuPage.js';


const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#607D8B',
    }
});
class Main extends Component {
    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            {this.props.children}
        </MuiThemeProvider>;
    }
}


const routes = (
    <Route component={Main}>
        <Route path='/' name='root' component={HomePage} />
        <Route path='/menu' name='menu' component={MenuPage} />
    </Route>
);

export default routes;
