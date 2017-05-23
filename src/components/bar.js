import React, { PropTypes } from "react";

const componentName = props => (
  <div className="bar" style={props.styles} title={props.title}>
    {props.day.length > 0 ? <p className="bar-text">{props.title}</p> : ""}
  </div>
);

componentName.propTypes = {
  styles: PropTypes.object,
  title: PropTypes.string,
  day: PropTypes.array
};

export default componentName;
