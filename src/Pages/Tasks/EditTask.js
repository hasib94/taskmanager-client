import React, { Component } from "react";
import Axios from "axios";
import Alert from '../../Components/Alert';
import api from "../../api";
import "./Tasks.css";

export default class EditTask extends Component {
  state = {
    name: "",
    isLoading: true,
    isDone: false,
    isError: false
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    await Axios({
      url: `${api.url}/task/get/${this.props.match.params.id}`,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(task => {
        this.setState({
          name: task.data.name,
          isLoading: false
        });
        console.log(task);
      })
      .catch(err => {
        console.log(err);
      });
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
      url: `${api.url}/task/edit`,
      data: {
        id: this.props.match.params.id,
        name: this.state.name
      },
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
      .then(data => {
        this.setState({
          isDone: true,
          isError: false
        });
      })
      .catch(err => {
        this.setState({
          isDone: false,
          isError: true
        });
      });
  };
  handleRemove = () => {
    this.setState({
      isDone: false,
      isError: false
    });
  };
  render() {
    return this.state.isLoading ? (
      <h3>Loading .. </h3>
    ) : (
      <div>
        {this.state.isDone && (
          <Alert givenClass="is-primary" alertRemove={this.handleRemove}>
            Successfully updated the task
          </Alert>
        )}
        {this.state.isError && (
          <Alert givenClass="is-danger" alertRemove={this.handleRemove}>
            There were errors updating the task
          </Alert>
        )}
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
