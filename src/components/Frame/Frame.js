import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  Container,
  Sidebar,
  Sidenav,
  Icon,
  Header,
  Content,
  Dropdown,
  Nav,
  DOMHelper
} from 'rsuite';

import NavToggle from './NavToggle';
import HeaderAvatar from '../HeaderAvatar';
import Footer from './Footer';

const { getHeight, on } = DOMHelper;
const navs = [
  {
    key: '1',
    icon: <Icon icon="dashboard" />,
    text: 'Dashboard',
    link: '/dashboard'
  }
];

class Frame extends React.Component {
  resizeListenner = null;
  static contextTypes = {
    router: PropTypes.object
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      windowHeight: getHeight(window),
      expand: false
    };
    this.resizeListenner = on(window, 'resize', this.updateHeight);
  }
  updateHeight = () => {
    this.setState({
      windowHeight: getHeight(window)
    });
  };
  handleToggle = () => {
    this.setState({
      expand: !this.state.expand
    });
  };

  componentWillUnmount() {
    if (this.resizeListenner) {
      this.resizeListenner.off();
    }
  }

  renderNavs() {
    return navs.map(item => {
      if (item.children) {
        return (
          <Dropdown
            key={item.key}
            eventKey={item.key}
            placement="rightTop"
            trigger="hover"
            title="Errors"
            icon={item.icon}
          >
            {item.children.map(child => {
              return (
                <Dropdown.Item
                  key={child.key}
                  eventKey={child.key}
                  componentClass={Link}
                  to={child.link}
                  activeClassName="nav-item-active"
                >
                  {child.text}
                </Dropdown.Item>
              );
            })}
          </Dropdown>
        );
      }

      return (
        <Nav.Item
          key={item.key}
          eventKey={item.key}
          icon={item.icon}
          componentClass={Link}
          to={item.link}
          activeClassName="nav-item-active"
        >
          {item.text}
        </Nav.Item>
      );
    });
  }
  render() {
    const { children } = this.props;
    const { expand, windowHeight } = this.state;

    const containerClasses = classNames('page-container', {
      'container-full': !expand
    });

    let navBodyStyle = null;
    if (expand) {
      navBodyStyle = {
        height: windowHeight - 112,
        overflow: 'auto'
      };
    }

    return (
      <Container className="frame">
        <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav.Header>
            <div className="header-hrand">
              <Link to="/">
                <img src="/logo.png" alt="wakatime dashboard" />
              </Link>
            </div>
          </Sidenav.Header>
          <Sidenav expanded={expand} defaultOpenKeys={['3']} activeKey={[]} appearance="subtle">
            <Sidenav.Body style={navBodyStyle}>
              <Nav>
                {this.renderNavs()}
                <Nav.Item
                  href="https://github.com/superman66/wakatime-dashboard"
                  icon={<Icon icon="github" />}
                  target="_blank"
                >
                  Github
                </Nav.Item>
                <Nav.Item
                  href="https://github.com/superman66/wakatime-sync"
                  icon={<Icon icon="clock-o" />}
                  target="_blank"
                >
                  Wakatime Sync Job
                </Nav.Item>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>

        <Container className={containerClasses}>
          <HeaderAvatar />
          <Content>{children}</Content>
          <Footer />
        </Container>
      </Container>
    );
  }
}

export default Frame;
