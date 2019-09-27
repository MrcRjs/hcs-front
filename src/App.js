import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './layout';
import Main from './pages/Main';
import Tasks from './pages/Tasks';

const App = () => (
    <div>
        <Layout>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/tasks" exact component={Tasks}/>
            </Switch>
        </Layout>
    </div>
);

export default App;
