import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import { UserContext } from './context/UserContext';
import Preprocess from './components/Preprocess';
import Container from '@material-ui/core/Container';
import Models from './components/Models';
import Columns from './components/Columns';
import Results from './components/Results';

function App() {
  const [task, setTask] = React.useState('Upload dataset');
  const store = {task:task, setTask:setTask};
  return (
    <div>
      <UserContext.Provider value={store}>
        <Container style={{marginBottom:"5%"}}>
            <h1 style={{textAlign:"center"}}>No Code ML</h1>
        </Container>
        <Router>
          <Switch>
            <Route path="/Upload" exact>
              <Homepage/>
            </Route>
            <Route path="/Preprocess" exact>
              <Preprocess/>
            </Route>
            <Route path="/Models" exact>
              <Models/>
            </Route>
            <Route path="/Columns" exact>
              <Columns/>
            </Route>
            <Route path="/Results" exact>
              <Results/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div> 
  );
}

export default App;
