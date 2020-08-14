import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavigationItem/NavItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavItem link={"/"} >Burger Builder</NavItem>
        <NavItem link={"/orders"} >Orders</NavItem>
        <NavItem link={"/auth"} >Authenticate</NavItem>
    </ul>
);

export default navigationItems;