import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TextField, IconButton, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import styles from './centerJumbotron.css';

class TitleBar extends Component {
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    handleClick() {
        browserHistory.push('/');
    }

    render() {
        return <div className={styles['jumbo-container']}>
            <div className={styles.wrapper} onClick={this.handleClick}>
                <div className={styles['logo-container']}>
                    <span className={styles['logo-text']}>subha pay</span>
                </div>
            </div>
        </div>;
    }
}

TitleBar.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default TitleBar;
