import React, { Component } from 'react';
import Person from './Person.js'
import Task from './Task.js'
import Home from './Home.js'
import Login from './Login.js'
import SecureRoute from './SecureRoute.js'
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <main>
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => {
                  return (
                    <Home/>
                  )
                }}
              />
              <SecureRoute
                exact path="/home"
                component={Person}
              />
              <Route path='/login'
              component={Login}/>
            <SecureRoute
              path="/:name"
              component={Task}
            />
          )}}
            />
          </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
