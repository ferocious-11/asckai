import React, { Component } from 'react';

import CenterJumbotron from '../CenterJumbotron/CenterJumbotron.js';
import MenuList from './MenuList/MenuList.js';
import Footer from '../Footer/Footer.js';

import styles from './menuPage.css';

class MenuPage extends Component {
    render() {
        return <div className={styles.MenuPage}>
            <CenterJumbotron />
            <MenuList />
            <Footer />
        </div>;
    }
}

MenuPage.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default MenuPage;
