import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Simulator from 'pages/Simulator';

import Route from './Route';

const Routes = () => (
  <Switch>
    {/* Public routes */}
    <Route path="/simulator" component={Simulator} />

    <Redirect to="/simulator" />
  </Switch>
);

export default Routes;
