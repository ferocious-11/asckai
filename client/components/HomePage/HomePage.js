import React, { Component } from 'react';

import CenterJumbotron from '../CenterJumbotron/CenterJumbotron.js';
import HomePageBody from './HomePageBody/HomePageBody.js';
import Footer from '../Footer/Footer.js';

class HomePage extends Component {
    render() {
        return <HomePageBody />;
    }
}

HomePage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default HomePage;
