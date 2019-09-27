import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './layout'
import Main from './pages/Main';

const App = () => (
  <div>
    <Layout>
      <Switch>
        <Route path="/" exact component={Main} />
      </Switch>
    </Layout>
  </div>
);

export default App;
