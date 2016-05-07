import React, { Component } from 'react';
import { TextField, IconButton, FlatButton } from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import styles from './centerJumbotron.css';

class TitleBar extends Component {
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        return <div className={styles['jumbo-container']}>
            <div className={styles.wrapper}>
                <div className={styles['logo-container']}>
                    <i
                        className="material-icons"
                        style={{
                            fontSize: '160px',
                            color: 'white',
                            position: 'relative',
                            left: '-10px'
                        }}>account_balance_wallet</i>

                    <span className={styles['logo-text']}>asckai</span>
                </div>
            </div>
        </div>;
    }
}

TitleBar.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default TitleBar;
