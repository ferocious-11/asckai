import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Paper, TextField, FlatButton } from 'material-ui';

import HomePageContent from './HomePageContent/HomePageContent.js';

import styles from './homePageBody.css';

class HomePageBody extends Component {
    constructor() {
        super();
        this.state = {
            mobile: null,
            password: ''
        };
    }

    handleMobileChange = (e) => {
        this.setState({
            ...this.state,
            mobile: e.target.value
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value
        });
    }

    handleMobileEntered = (e) => {
        if (this.state.mobile.trim() === '9851000085') {
            this.props.onMobileEntered(this.state.mobile);
        }
    }

    handlePasswordEntered = (e) => {
        this.props.onPasswordEntered(this.state.password);
        browserHistory.push('/menu');
    }

    render() {
        let child;
        if (this.props.mobile === '' || isNaN(this.props.mobile)) {
            child = <div className={styles['phone-container']}>
                <TextField
                    hintText="Mobile Number"
                    floatingLabelText=""
                    fullWidth={false}
                    type='text'
                    onChange={this.handleMobileChange}
                    underlineFocusStyle={{
                        backgroundColor: '#607D8B'
                    }}
                    underlineStyle={{
                        backgroundColor: '#607D8B'
                    }}
                    style={{
                        width: '400px'
                    }}
                    defaultValue={this.state.mobile}/>

                    <FlatButton
                        label="Go"
                        onClick={this.handleMobileEntered}
                        style={{
                            marginLeft: '10px'
                        }} />
            </div>;
        } else {
            child = <div className={styles['phone-container']}>
                <TextField
                    hintText="Password"
                    floatingLabelText=""
                    fullWidth={false}
                    type='password'
                    onChange={this.handlePasswordChange}
                    underlineFocusStyle={{
                        backgroundColor: '#607D8B'
                    }}
                    underlineStyle={{
                        backgroundColor: '#607D8B'
                    }}
                    style={{
                        width: '400px'
                    }}
                    defaultValue=''
                    value={this.state.password} />

                    <FlatButton
                        label="Go"
                        onClick={this.handlePasswordEntered}
                        style={{
                            marginLeft: '10px'
                        }} />
            </div>;
        }

        return <div>
            <div className={styles['homepage-body']}>
                <Paper zDepth={1}>
                    {child}
                </Paper>
            </div>

            <HomePageContent />
        </div>;
    }
}

function mapStateToProps(state) {
    return {
        mobile: state.mobile,
        password: state.password
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onMobileEntered: (number) => {
            dispatch({
                type: 'MOBILE_NUMBER_ENTERED',
                number
            });
        },
        onPasswordEntered: (password) => {
            dispatch({
                type: 'PASSWORD_ENTERED',
                password
            });
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageBody);
