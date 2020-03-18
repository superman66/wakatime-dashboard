import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, Dropdown, Icon } from 'rsuite';

const styles = {
  icon: {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
  },
  navItem: {
    width: 56,
    textAlign: 'center'
  }
};

const propTypes = {
  expand: PropTypes.bool,
  onChange: PropTypes.func
};

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Navbar.Body>
        <Nav pullRight>
          <Nav.Item onClick={onChange} style={styles.navItem}>
            <Icon icon={expand ? 'angle-left' : 'angle-right'} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

NavToggle.propTypes = propTypes;
export default NavToggle;
