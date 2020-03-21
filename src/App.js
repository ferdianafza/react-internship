import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Dashboard from './dashboard/Dashboard';
import Login from './Auth/Login';
import MyProfile from './Acount/MyProfile';
import CreateReport from './reports/CreateReport';
import Presences from './presences/Presences';
import Reports from './reports/Reports';
import Report from './reports/Report';

class App extends Component {
  render() {
    return (
    <Router>
          <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/reports/:id' component={Report} />
              <Route path='/reports' component={Reports} />
              <Route path='/presences' component={Presences} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/myprofile' component={MyProfile} />
              <Route path='/createreport' component={CreateReport} />
          </Switch>
      </Router>
    );
  }
}

export default App;
