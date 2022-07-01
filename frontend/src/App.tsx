import { ReactElement } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Articles } from "./components/Articles/Articles";
import { Login } from "./components/Login/Login";
import { Screen404 } from "./components/Screen404/Screen404";

const history = createBrowserHistory();

const App = (): ReactElement => {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route path="/recent-articles">
            <Articles />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Screen404 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
