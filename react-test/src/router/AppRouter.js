import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import * as browserHistory from 'history';

import PublicRoute from './PublicRoute';

import PageNotFound from '../page/PageNotFound';
import Ingredients from '../page/Ingredients';

export const history = browserHistory.createBrowserHistory();

class AppRouter extends PureComponent {

  render() {
    return (
      <Router history={history}>
        <Switch>
          <PublicRoute
            path="/"
            component={Ingredients}
            exact
          />
          <Route
            component={PageNotFound}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
