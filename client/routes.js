import React, { Component } from 'react';
import { Route } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CenterJumbotron from './components/CenterJumbotron/CenterJumbotron.js';
import Footer from './components/Footer/Footer.js';

import HomePage from './components/HomePage/HomePage.js';
import MenuPage from './components/MenuPage/MenuPage.js';
import AboutPage from './components/AboutPage/AboutPage.js';

import styles from './styles/base.css';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#607D8B',
    }
});
class Main extends Component {
    static propTypes = {
        children: React.PropTypes.node
    };

    render() {
        return <MuiThemeProvider muiTheme={muiTheme}>
            <div className={styles.container}>
                <CenterJumbotron />
                <div className={styles.contentContainer}>
                    {this.props.children}
                </div>
                <Footer />
            </div>
        </MuiThemeProvider>;
    }
}


const routes = (
    <Route component={Main}>
        <Route path='/' name='root' component={HomePage} />
        <Route path='/menu' name='menu' component={MenuPage} />
        <Route path='/about' name='about' component={AboutPage} />
    </Route>
);

export default routes;
