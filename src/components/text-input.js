import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getActiveItemCustom } from "../utils/reducer_helpers";
import * as actions from "../actions/index";

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.customizeOrder(e.target.value);
  }
  render() {
    return (
      <textarea
        type="text"
        placeholder="customize"
        value={getActiveItemCustom(this.props.order)}
        onChange={this.handleChange}
      />
    );
  }
}

TextInput.propTypes = {
  order: PropTypes.object,
  customizeOrder: PropTypes.func
};

const mapStateToProps = ({ order }) => ({
  order
});

export default connect(mapStateToProps, actions)(TextInput);
