/* @flow */

import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export const menuLinks = {
  '/orders': 'Orders',
  '/products': 'Products',
  '/customers': 'Customers',
  '/employees': 'Employees',
  '/categories': 'Categories',
  '/shippers': 'Shippers',
  '/suppliers': 'Suppliers',
  '/regions': 'Regions',
};

export default class Menu extends React.Component<Object> {
  render() {
    return (
      <Nav bsStyle="tabs" style={{ marginBottom: '20px' }}>
        <IndexLinkContainer to={{ pathname: '/' }}>
          <NavItem>MainPage</NavItem>
        </IndexLinkContainer>

        {Object.keys(menuLinks).map(link => (
          <LinkContainer key={link} to={{ pathname: link }}>
            <NavItem>{menuLinks[link]}</NavItem>
          </LinkContainer>
        ))}
      </Nav>
    );
  }
}
