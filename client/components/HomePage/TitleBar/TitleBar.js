import React, { Component } from 'react';

import styles from './titleBar.css';

class TitleBar extends Component {
    render() {
        return <div className={styles.titleBar}>
            <div className={styles.title}></div>
            <div className={styles['center-links']}>
                <a href="#" className={styles.link}>Mobile</a>
                <a href="#" className={styles.link}>DTH</a>
                <a href="#" className={styles.link}>Electricity</a>
                <a href="#" className={styles.link}>Water</a>
            </div>

            <div className={styles['right-links']}>
                <a href="#" className={styles.link}>Login</a>
            </div>
        </div>;
    }
}

export default TitleBar;
