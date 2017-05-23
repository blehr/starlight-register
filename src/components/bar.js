import React, { PropTypes } from 'react';

const componentName = props => {
  return (
    <div className="bar" style={props.styles} title={props.title}  >
      { props.day.length > 0 ? <p className="bar-text">{ props.title }</p> : ''}
    </div>
  );
};

componentName.propTypes = {
  
};

export default componentName;