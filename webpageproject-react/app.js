import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Servicii from './components/Servicii';
import DespreNoi from './components/DespreNoi';
import Contact from './components/Contact';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/servicii" component={Servicii} />
        <Route path="/despre-noi" component={DespreNoi} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </Router>
  );
};

export default App;
