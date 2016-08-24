import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

export const menuLinks = {
  '/categories': 'Categories',
  '/customers': 'Customers',
  '/employees': 'Employees',
  '/orders': 'Orders',
  '/products': 'Products',
  '/regions': 'Regions',
  '/shippers': 'Shippers',
  '/suppliers': 'Suppliers',
};

export default class Menu extends React.Component {
  render() {
    return (
      <Nav bsStyle="tabs" onSelect={this.handleSelect} style={{ marginBottom: '20px' }}>
        <IndexLinkContainer to={{ pathname: '/' }}>
          <NavItem>MainPage</NavItem>
        </IndexLinkContainer>

        { Object.keys(menuLinks).map(link => (
            <LinkContainer key={link} to={{ pathname: link }}>
              <NavItem>{menuLinks[link]}</NavItem>
            </LinkContainer>
          ))
        }
      </Nav>
    );
  }
}
