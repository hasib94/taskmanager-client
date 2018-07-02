import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import Api from "../../api";

export default class Tasks extends Component {
  state = {
    isLoading: true,
    tasks: []
  };
  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    Axios({
      method: "get",
      url: `${Api.url}/tasks`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(tasks => {
        this.setState({
          tasks: tasks.data,
          isLoading: false
        });
        console.log(tasks);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete = id => {
    Axios({
      method: "post",
      url: `${Api.url}/task/delete`,
      data: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(data => {
        let tasks = this.state.tasks.filter(task => {
          return task.id != id;
        });
        this.setState({ tasks: tasks });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleCheck = id => {
    Axios({
      method: "post",
      url: `${Api.url}/task/done`,
      data: {
        id: id
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(data => {
          let tasks = this.state.tasks.map(task => {
              if(task.id == id) {
                  task.complete = true
              }
              return task;
          });
          this.setState({tasks: tasks})
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div>
        <h3 className="titleMain">All Tasks</h3>
        {this.state.isLoading ? (
          <h2>Loading......</h2>
        ) : (
          this.state.tasks.map((task, index) => {
            return (
              <div className="task" key={task.id}>
                <span>
                <span>#{index+1}. </span>
                <span className={ task.complete ? 'taskDone': '' }>{task.name}</span>
                <span className="date">
                {moment(task.created_at).fromNow()}</span>
                </span>
                <span>
                  <span
                    className="icon"
                    onClick={() => this.handleDelete(task.id)}
                  >
                    <i className="fas fa-trash" />
                  </span>
                  <Link to={`edit/${task.id}`}>
                    <span className="icon">
                      <i className="fas fa-edit" />
                    </span>
                  </Link>
                  {!task.complete && (
                    <span
                    className="icon"
                    onClick={() => this.handleCheck(task.id)}
                    >
                    <i className="fas fa-check" />
                    </span>
                  )}
                </span>
              </div>
            );
          })
        )}
      </div>
    );
  }
}
