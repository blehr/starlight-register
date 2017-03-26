import React, { PropTypes } from "react";

const MenuItem = props => (
  <button
    style={props.addStyle}
    className={props.passClassName}
    value={props.value}
    disabled={props.isDisabled}
    onClick={() => props.handleClick(props.value)}
  >
    {props.name}
  </button>
);

MenuItem.propTypes = {
  name: PropTypes.any,
  passClassName: PropTypes.string,
  value: PropTypes.any,
  handleClick: PropTypes.func,
  addStyle: PropTypes.object,
  isDisabled: PropTypes.bool
};

export default MenuItem;
