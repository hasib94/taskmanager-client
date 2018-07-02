import React, { Component } from "react";
import Axios from "axios";
import api from "../../api";
import { Link } from "react-router-dom";
import Alert from "../../Components/Alert"
import "./LoginForm.css";

export default class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isError: ""
  };

  componentDidMount() {
    console.log(this.props.match.params.type);
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.match.params.type == "login") {
      this.login();
    } else {
      this.register();
    }
    // this.props.history.push("/dash")
  };

  login = () => {
    // TODO: validate client

    Axios.post(`${api.url}/auth/login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(data => {
        console.log(data.data);
        sessionStorage.setItem("token", data.data.access_token);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          isError: true,
          errMsg: 'Invalid Credentials'
        });
      });
  };

  register = () => {
    // TODO: validate client

    Axios.post(`${api.url}/auth/register`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(data => {
        console.log(data.data);
        alert("You have registered successfully!");
        this.props.history.push("/auth/login");
      })
      .catch(err => {
        let errors = '';
        for(let prop in err.response.data.errors) {
          errors += `${err.response.data.errors[prop][0]}`;
        }
        // err.errors.forEach(e => {
        //   console.log(e);
        // })
        this.setState({
          isError: true,
          errMsg: errors
        })
      });
  };

  handleRemove = () => {
    this.setState({
      isDone: false,
      isError: false
    });
  };

  render() {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <h2 className="titleMain">
            {this.props.match.params.type === "login"
              ? "Login Here"
              : "Register Here"}
          </h2>
          {this.state.isError && (
            <Alert givenClass="is-danger" alertRemove={this.handleRemove}>
              {this.state.errMsg}
            </Alert>
          )}
          <form onSubmit={this.handleSubmit} className="form-auth">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  name="email"
                  className="input"
                  type="email"
                  placeholder="Email Input"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  name="password"
                  className="input"
                  type="password"
                  placeholder="Password Input"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <input type="submit" className="button is-primary" value="Submit" />
          </form>
          {this.props.match.params.type == "login" ? (
            <Link to="/auth/register">
              <h3 className="regLink">New Here? Register</h3>
            </Link>
          ) : (
            <Link to="/auth/login">
              <h3 className="regLink">Login</h3>
            </Link>
          )}
        </div>
      </div>
    );
  }
}
