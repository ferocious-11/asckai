import React, { Component } from 'react';
import { Paper, TextField, RaisedButton, DropDownMenu, MenuItem } from 'material-ui';

import styles from './menuList.css';

class MenuList extends Component {
    constructor() {
        super();
        this.state = {
            dthProvider: 'Subisu'
        };
    }

    handleDthChange = (event, index, value) => {
        this.setState({
            ...this.state,
            dthProvider: value
        });
    }

    render() {
        const cardStyle = {
            width: '370px',
            height: '260px',
            padding: '20px',
            fontFamily: 'Roboto',
            marginBottom: '50px',
            boxSizing: 'border-box',
            position: 'relative'
        };
        const buttonStyle = {
            position: 'absolute',
            bottom: '20px',
            right: '20px'
        };
        const textFieldStyle = {
            paddingLeft: '24px',
            width: 'calc(100% - 72px)'
        };

        return <div className={styles['menu-list']}>
            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['menu-item-header']}>Electricity</h2>
                <div className={styles['menu-item-body']}>
                    <TextField
                        hintText="Full name"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <TextField
                        hintText="Unique ID"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <RaisedButton
                        label="Pay"
                        primary={true}
                        style={buttonStyle} />
                </div>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['menu-item-header']}>Water</h2>
                <div className={styles['menu-item-body']}>
                    <TextField
                        hintText="Full name"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <TextField
                        hintText="Unique ID"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <RaisedButton
                        label="Pay"
                        primary={true}
                        style={buttonStyle} />
                </div>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['menu-item-header']}>DTH</h2>
                <div className={styles['menu-item-body']}>
                    <TextField
                        hintText="Unique ID"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <DropDownMenu
                        value={this.state.dthProvider}
                        style={{
                            width: '100%',
                            padding: '0'
                        }}
                        onChange={this.handleDthChange}>
                        <MenuItem value="Subisu" primaryText="Subisu" />
                        <MenuItem value="Sim TV" primaryText="Sim TV" />
                        <MenuItem value="Dish Home" primaryText="Dish Home" />
                    </DropDownMenu>
                    <RaisedButton
                        label="Pay"
                        primary={true}
                        style={buttonStyle} />
                </div>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['menu-item-header']}>Telecom</h2>
                <div className={styles['menu-item-body']}>
                    <TextField
                        hintText="Full name"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <TextField
                        hintText="Unique ID"
                        type="text"
                        fullWidth={false}
                        style={textFieldStyle} />
                    <RaisedButton
                        label="Pay"
                        primary={true}
                        style={buttonStyle} />
                </div>
            </Paper>
        </div>;
    }
}

export default MenuList;
