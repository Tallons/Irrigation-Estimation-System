import React from "react";
import {Switch, Route} from "react-router-dom";
import Auth from "./Components/Auth";
import Dashboard from "./Components/Dashboard"
import Bid from "./Components/Bid/Bid"
import Data from "./Components/Data"
import Payroll from "./Components/Payroll"

export default (
   <Switch>
      <Route exact path="/" component={Auth}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/bid" component={Bid}/>
      <Route path="/data" component={Data}/>
      <Route path="/payroll" component={Payroll}/>
   </Switch>
)