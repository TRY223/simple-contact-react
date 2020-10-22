import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import './App.css';
import store from './redux/store';
import ContactPage from './ui/pages/ContactPage';
import DetailContactPage from './ui/pages/DetailContactPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/contacts/:id">
            <DetailContactPage />
          </Route>
          <Route path="/contacts">
            <ContactPage />
          </Route>
          <Route exact path="/">
            <Redirect to="/contacts" />
          </Route>
          <Route>
            <div>
              <h1>404 Page</h1>
            </div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
