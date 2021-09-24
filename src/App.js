import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Form from './components/Form';
import List from './components/List';
function App() {
  return <div>
    <Router>
      <Switch>
        <Route path="/foods/:id/edit" component={Form} />
        <Route path="/foods/new" component={Form} />
        <Route path="/foods" component={List} />
      </Switch>
    </Router>
  </div>;
}

export default App;
