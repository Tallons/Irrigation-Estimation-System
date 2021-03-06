import React from "react";
import {Switch, Route} from "react-router-dom";
import Landing from "./Components/Landing";
import Dashboard from "./Components/Dashboard/Dashboard"
import Bid from "./Components/Bid/Bid"
import Data from "./Components/Data"
import Payroll from "./Components/Payroll"

export default (
   <Switch>
      <Route exact path="/" component={Landing}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/bid/:id" component={Bid}/>
      <Route path="/data" component={Data}/>
      <Route path="/payroll" component={Payroll}/>
   </Switch>
)