import './App.css';
import { store } from './index';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';
import BooksComponent from './components/books/BooksComponent';
import NavbarComponent from './components/utilities/NavbarComponent';
import CounterComponent from './components/counter/CounterComponent';
import { CashFlow } from './components/cashflow/CashFlowComponent'

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Router>

        <div className="App container-fluid">

          <NavbarComponent />

          <h6 className="alert alert-success mt-3">This app uses React, React-Router-DOM, Redux, Saga, and Bootstrap.</h6>

          <Switch>
            <Route exact path="/">
              <BooksComponent />
            </Route>
            <Route path="/books">
              <BooksComponent />
            </Route>
            <Route path="/cashflow">
              <CashFlow />
            </Route>
            <Route path="/counter">
              <CounterComponent />
            </Route>
          </Switch>

        </div>

      </Router>

    );
  }

}

export const App = connect()(AppComponent);; 
