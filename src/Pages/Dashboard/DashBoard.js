import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import AddTask from '../Tasks/AddTask';
import EditTask from '../Tasks/EditTask';
import Tasks from '../Tasks/Tasks';
import Menu from "../../Components/Menu";
import './DashBoard.css';

export default class DashBoard extends Component {
  render() {
    return (
      <div>

        <div>
          <div className="Dash">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <Menu />
                </div>
                <div className="column is-four-fifths">
                  <div className="main">
                    <div>
         <Route
          path="/:name/all"
          render={({ match }) => (
            <Tasks/>
        )}/>
         <Route
          path="/:name/add"
          render={({ match }) => (
            <AddTask />
        )}/>
        <Route
          path="/:name/edit/:id"
          render={({ match }) => (
            <EditTask match={match}/>
        )}
      />
      </div>
    </div>
  </div>
</div>
</div>
</div>
</div>
      </div>
    );
  }
}
