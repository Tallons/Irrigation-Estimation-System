import React from 'react';
import {withRouter} from "react-router-dom";
import routes from "./routes";
import Nav from "./Components/Nav";
import './App.scss';

const App = (props) => {

  return (
    <div className="App">
        {props.location.pathname === "/"
        ? (<>
              {routes}
          </>)
        : (<>
              <Nav />
              {routes}
          </>)}
    </div>
  );
}
export default withRouter(App);
