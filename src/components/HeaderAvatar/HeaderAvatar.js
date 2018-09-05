//@flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Popover, Whisper, Icon, Button } from 'rsuite';

const Menu = ({ onSelect, onLogout }) => (
  <Dropdown.Menu onSelect={onSelect}>
    <Dropdown.Item >退出当前ID</Dropdown.Item>
  </Dropdown.Menu>
);

const MenuPopover = ({ onSelect, ...rest }) => (
  <Popover {...rest} full>
    <Menu onSelect={onSelect} />
  </Popover>
);

type Props = {};
class HeaderAvatar extends React.Component<Props> {
  static contextTypes = {
    router: PropTypes.object
  };
  trigger = null;
  handleSelectMenu = (eventKey: any, event: SyntheticEvent<*>) => {
    if (this.trigger) {
      this.trigger.hide();
      this.handleLogout();
    }
  };

  handleLogout = () => {
    const { router } = this.context;
    localStorage.removeItem('gistId');

    router.push('/login');
  };
  render() {
    return (
      <div className="header-avatar">
        <Whisper
          placement="bottomRight"
          trigger="click"
          triggerRef={ref => {
            this.trigger = ref;
          }}
          speaker={<MenuPopover onSelect={this.handleSelectMenu} />}
        >
          <Icon icon="user-circle-o" size="lg" />
        </Whisper>
      </div>
    );
  }
}

export default HeaderAvatar;
