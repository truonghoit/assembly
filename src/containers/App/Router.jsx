import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import ExamplePageOne from '../Example/index';
import ExamplePageTwo from '../ExampleTwo/index';
import MasterPage from '../MasterPage/index';
import MasterAlarm from "../MasterAlarm/index";

const Pages = () => (
	<Switch>
		<Route path="/pages/one" component={ExamplePageOne} />
		<Route path="/pages/two" component={ExamplePageTwo} />
		<Route path="/pages/master" component={MasterPage} />
		<Route path="/pages/alarm-master" component={MasterAlarm} />
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
