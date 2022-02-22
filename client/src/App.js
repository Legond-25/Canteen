import Home from './components/Home/Home';
import './css/style.css';
import Login from './components/Home/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registration from './components/Home/Registration';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/registration">
              <Registration />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
