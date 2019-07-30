import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn              from '../LogIn/index';
import MasterPage         from '../MasterPage/index';
import MasterAlarm        from "../MasterAlarm/index";
import LeadTime           from "../LeadTime/index";
import LeadTimeDetail     from "../LeadTimeDetail/index";
import MachineAlarmStatus from "../AlarmHistory/index";

const Pages = () => (
	<Switch>
		<Route path="/pages/master-page" component={MasterPage} />
		<Route path="/pages/alarm-master" component={MasterAlarm} />
		<Route path="/pages/lead-time" component={LeadTime} />
		<Route path="/pages/lead-time-detail" component={LeadTimeDetail} />
		<Route path="/pages/alarm-history" component={MachineAlarmStatus} />
	</Switch>
);

const wrappedRoutes = () => (
<div>
<Layout />
<div className="container__wrap">
  <Route path="/pages" component={Pages} />
</div>
</div>
);

const Router = () => (
<MainWrapper>
<main>
  <Switch>
	<Route exact path="/" component={LogIn} />
	<Route exact path="/log_in" component={LogIn} />
	<Route path="/" component={wrappedRoutes} />
  </Switch>
</main>
</MainWrapper>
);

export default Router;
