import React, { Component } from 'react';
import {
    Paper,
    TextField,
    FlatButton,
    Stepper,
    Step,
    StepButton } from 'material-ui';

import styles from './homePageContent.css';

class HomePageContent extends Component {
    render() {
        const cardStyle = {
            width: '370px',
            height: '220px',
            padding: '20px',
            fontFamily: 'Roboto',
            marginBottom: '50px',
            boxSizing: 'border-box'
        };

        const stepStyle = {
            width: '100%',
            padding: '20px',
            marginBottom: '50px'
        };

        return <div className={styles['homepage-content']}>

            <Paper zDepth={1} style={stepStyle}>
                <h2 className={styles['content-header']}>Four Easy Steps</h2>

                <Stepper linear={false} activeStep={-1}>
                    <Step>
                        <StepButton>Enter phone number</StepButton>
                    </Step>

                    <Step>
                        <StepButton>Enter password</StepButton>
                    </Step>

                    <Step>
                        <StepButton>Enter bill details</StepButton>
                    </Step>

                    <Step>
                        <StepButton>Review and pay!</StepButton>
                    </Step>
                </Stepper>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['content-header']}>SSL Secured</h2>
                <p className={styles['content-body']}>
                    asckai is 128 bit EV SSL secured.
                    This simply means that all your transactional &
                    personal card details added while doing your online
                    recharge will always be safe & secure.</p>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['content-header']}>Secured by Norton</h2>
                <p className={styles['content-body']}>
                    The Norton checkmark denotes the
                    highest level of trust, which means that your online recharges can be
                    made securely with complete peace of mind.
                </p>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['content-header']}>PCI-DSS Compliant</h2>
                <p className={styles['content-body']}>
                    We are one of the top recharge site and are constantly
                    getting ourselves tested and verified through certifications
                    from top security vendors
                </p>
            </Paper>

            <Paper zDepth={1} style={cardStyle}>
                <h2 className={styles['content-header']}>Comprehensive payment options</h2>
                <p className={styles['content-body']}>
                    asckai offers you a comprehensive list of payment options - credit card,
                    debit card, net banking, ATM card from all leading banks
                </p>
            </Paper>
        </div>;
    }
}

export default HomePageContent;
