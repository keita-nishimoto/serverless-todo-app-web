import * as React from "react";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Counter from "./counter/Container";
import NotFound from "./NotFound";
import Todo from "./todo/Container";

export default class Routes extends React.Component<{}, {}> {

  public render() {
    return (
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route path="/counter/:myParams" component={Counter} />
        <Route path="/todo" component={Todo} />
        <Route component={NotFound}/>
      </Switch>
    );
  }
}
