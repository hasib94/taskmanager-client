import React, { Component, Fragment } from "react";
import Axios from "axios";
import api from "../../api";
import Alert from "../../Components/Alert";
import "./Tasks.css";
export default class AddTask extends Component {
  state = {
    name: '',
    isDone: false,
    isError: false
  };
  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // TODO: varify inputs again

    this.storeData();
  };

  storeData = () => {
    Axios({
      method: "post",
      url: `${api.url}/task/add`,
      data: {
        name: this.state.name
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(data => {
        this.setState({
            isDone: true,
            isError: false,
            name: ''
        })
      })
      .catch(err => {
        this.setState({
            isError: true,
            isDone: false
        })
      });
  };

  handleRemove = () => {
      this.setState({
          isDone: false,
          isError: false
      })
  }

  render() {
    return (
      <div>
        { this.state.isDone && (<Alert givenClass="is-primary" alertRemove={this.handleRemove}>Successfully added the task</Alert>) }
        { this.state.isError && (<Alert givenClass="is-danger" alertRemove={this.handleRemove}>There were errors adding the task</Alert>) }
        <form onSubmit={this.handleSubmit} className="form-add">
          <div className="field">
            <label className="label">Enter Task Name</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                placeholder="Name Input"
                value={this.state.name}
                required
                onChange={this.handleChange}
              />
            </div>
          </div>
          <input type="submit" className="button is-link" value="Submit" />
        </form>
      </div>
    );
  }
}
