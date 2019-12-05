import React from 'react';
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import './App.css';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import Home from './components/Home';
import TrainingCalendar from './components/TrainingCalendar';

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
            <Link style={padding} to="/calendar">calendar</Link>
          </div>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/trainings" render={() => <Traininglist />} />
            <Route path="/customers" render={() => <Customerlist />} />
            <Route path="/calendar" render={() => <TrainingCalendar />} />
        </div>
      </Router>
    </div>
  );
}

export default App;
