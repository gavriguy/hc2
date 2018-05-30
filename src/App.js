import React from 'react';
import HillChart from './HillChart';
import Info from './Info';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => (
  <Router>
    <div>
      <Route path="/hillchart" component={HillChart} />
      <Route path="/info" component={Info} />
    </div>
  </Router>
);

export default App;
