import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";

export default function(WrappedComponent) {
  class Auth extends React.Component {
    componentWillMount() {
      if (!this.props.auth.authenticated) {
        let hasLocalStorageUser = false;

        for (let key in localStorage) {
          if (key.startsWith("firebase:authUser:")) {
            hasLocalStorageUser = true;
          }
        }

        if (!hasLocalStorageUser) {
          browserHistory.push("/");
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  Auth.propTypes = {
    auth: PropTypes.object
  }

  const mapStateToProps = ({ auth }) => ({
    auth
  });

  return connect(mapStateToProps)(Auth);
}
