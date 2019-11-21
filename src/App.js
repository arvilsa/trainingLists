import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Home from './components/Home';

function App() {
  const padding = { padding: 5 }
  return (
    <div className="App">
        <Router>
        <div>
          <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/trainings">trainings</Link>
            <Link style={padding} to="/customers">customers</Link>
          </div>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/trainings" render={() => <Traininglist />} />
            <Route path="/customers" render={() => <Customerlist />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
