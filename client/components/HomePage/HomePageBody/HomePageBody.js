import React, { Component } from 'react';
import { Paper, TextField, FlatButton } from 'material-ui';

import HomePageContent from './HomePageContent/HomePageContent.js';

import styles from './homePageBody.css';

class HomePageBody extends Component {
    render() {
        return <div>
            <div className={styles['homepage-body']}>
                <Paper zDepth={1}>
                    <div className={styles['phone-container']}>
                        <TextField
                            hintText="Mobile Number"
                            floatingLabelText=""
                            fullWidth={false}
                            type='text'
                            underlineFocusStyle={{
                                backgroundColor: '#607D8B'
                            }}
                            underlineStyle={{
                                backgroundColor: '#607D8B'
                            }}
                            style={{
                                width: '400px'
                            }} />

                            <FlatButton
                                label="Go"
                                style={{
                                    marginLeft: '10px'
                                }} />
                    </div>
                </Paper>
            </div>

            <HomePageContent />
        </div>;
    }
}

export default HomePageBody;
