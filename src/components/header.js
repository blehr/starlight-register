import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }
  logOut() {
    this.props.signOutUser();
  }
  render() {
    return (
      <header className="flex-header">
        <h2>Starlight</h2>
        <Link to="/pizzas" >Register</Link>
        <Link to="/orders" >Orders</Link>
        <Link to="/dashboard" >Dashboard</Link>
        <button onClick={this.logOut}>Log Out</button>
      </header>
    );
  }
}

Header.propTypes = {
  signOutUser: PropTypes.func
};


export default connect(null, actions)(Header);