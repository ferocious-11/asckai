import React, { Component } from 'react';

import styles from './footer.css';

class Footer extends Component {
    render() {
        return <div className={styles.footer}>
            <a href="#" className={styles.link}>About Us</a>
            <a href="#" className={styles.link}>Contact Us</a>
        </div>;
    }
}

export default Footer;
