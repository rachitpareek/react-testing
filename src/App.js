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
import CashFlowComponent from './components/cashflow/CashFlowComponent'

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Router>

        <div className="App container-fluid">

          <NavbarComponent />

          <h6 className="alert alert-success mt-3">This app uses React, React-Router-DOM, Redux, and Bootstrap.</h6>

          <Switch>
            <Route exact path="/">
              <BooksComponent />
            </Route>
            <Route path="/books">
              <BooksComponent />
            </Route>
            <Route path="/cashflow">
              <CashFlowComponent />
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

const App = connect()(AppComponent);
export default App; 
