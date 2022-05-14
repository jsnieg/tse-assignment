import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home from './components/HomePage/Home';
import Privacy from './components/PrivacyPage/Privacy';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/Privacy'>
          <Privacy />
        </Route>
      </Layout>
    );
  }
}
