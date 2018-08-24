// @flow
import React from 'react';
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

type Props = {
  expand?: boolean,
  onChange?: () => void
};

const NavToggle = ({ expand, onChange }: Props) => {
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

export default NavToggle;
