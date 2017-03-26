import React, { PropTypes } from 'react';
import MenuRoutes from './menu-routes';

const SquareResponse = props => (
  <MenuRoutes>
    <pre>
      <code>
        {props.location.query.data}
      </code>
    </pre>
  </MenuRoutes>
);

SquareResponse.propTypes = {
  location: PropTypes.object
}

export default SquareResponse;