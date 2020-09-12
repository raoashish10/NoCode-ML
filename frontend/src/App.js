import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Homepage/>
          </Route>
        </Switch>
      </Router>
    </div> 
  );
}

export default App;
