import React from 'react';

import burgerlogo from '../../assets/images/27.1 burger-logo.png.png';

import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerlogo} alt="BurgerLogo"/>
    </div>
);

export default logo;