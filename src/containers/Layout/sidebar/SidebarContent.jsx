import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    changeToDark: PropTypes.func.isRequired,
    changeToLight: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const { changeToDark, changeToLight } = this.props;
    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarCategory title="Example Pages" icon="diamond">
				<SidebarLink title="Page one" route="/pages/one" onClick={this.hideSidebar} />
				<SidebarLink title="Page two" route="/pages/two" onClick={this.hideSidebar} />
				<SidebarLink title="Master page" route="/pages/master-page" onClick={this.hideSidebar} />
	            <SidebarLink title="Alarm master" route="/pages/alarm-master" onClick={this.hideSidebar} />
	            <SidebarLink title="Lead time" route="/pages/lead-time" onClick={this.hideSidebar} />
	            <SidebarLink title="Lead time Detail" route="/pages/lead-time-detail" onClick={this.hideSidebar} />
	            <SidebarLink title="Machine Alarm Status" route="/pages/machine-alarm-status" onClick={this.hideSidebar} />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
