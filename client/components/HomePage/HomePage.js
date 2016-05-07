import React, { Component } from 'react';

import TitleBar from './TitleBar/TitleBar.js';
import CenterJumbotron from './CenterJumbotron/CenterJumbotron.js';
import HomePageBody from './HomePageBody/HomePageBody.js';

import styles from './homePage.css';

class HomePage extends Component {
    render() {
        return <div>
            <CenterJumbotron />
            <HomePageBody />
        </div>;
    }
}

HomePage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default HomePage;
