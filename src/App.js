import React from 'react';
import {withRouter} from "react-router-dom";
import routes from "./routes";
import Nav from "./Components/Nav";
import './App.css';

const App = (props) => {
  return (
    <div className="App">
      {console.log(props)}
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
