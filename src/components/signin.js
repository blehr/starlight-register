import React, { Component, PropTypes } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.submitLogin = this.submitLogin.bind(this);
  }
  submitLogin(values) {
    this.props.signInUser(values);
  }
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="signin-div">
        {this.props.auth.error &&
          <h5 className="warning">{this.props.auth.error}</h5>}
        <form onSubmit={handleSubmit(this.submitLogin)}>
          
            <label htmlFor="email">Email</label>
            
              <Field
                name="email"
                component="input"
                type="text"
                placeholder="Email"
              />
            
          
          
            <label htmlFor="password">Password</label>
            
              <Field
                name="password"
                component="input"
                type="password"
                placeholder="Password"
              />
          
          
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button
              type="button"
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignIn.propTypes = {
  signInUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
  auth: PropTypes.object
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: "signin"
  })(SignIn)
);
