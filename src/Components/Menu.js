import React, { Component } from 'react';
import {
  NavLink,
  withRouter 
} from 'react-router-dom';
import Axios from 'axios';
import api from '../api';

class Menu extends Component {

    handleLogout = () => {
        console.log('logout');
        Axios({
            method: 'post',
            url: `${api.url}/auth/logout`,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(data => {
            console.log(data);
            sessionStorage.removeItem('token');
            this.props.history.push('auth/login');
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return(
            <aside className="menu">
                <p className="menu-label">
                Select from below
                </p>
                <ul className="menu-list">
                <li><NavLink to="/dashboard/all" activeClassName='is-active'>All Tasks</NavLink></li>
                <li><NavLink to="/dashboard/add" activeClassName='is-active'>Add New Task</NavLink></li>
                <li><a onClick={() => this.handleLogout()}>Log Out</a></li>
                </ul>
            </aside>
        );
    }
}

export default withRouter(Menu);