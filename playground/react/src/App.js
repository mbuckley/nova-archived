import React from 'react';
import { Router, Link } from "@reach/router"
import '../node_modules/@clio/nova-core-react/node_modules/@clio/nova-core/dist/core/core.css';
import './App.css';

import {
  Home,
  Forms
} from "./pages";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/forms">Forms</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {

  return (
    <div className="App">
      <header>
        <Nav />
      </header>
      <main>
        <Router>
          <Home path="/" />
          <Forms path="forms" />
        </Router>
      </main>
    </div>
  );
}

export default App;
