import React, { PropTypes } from 'react';


const Delivery = props => (
  <div className="delivery">
    <label>
      <input
        type="radio"
        name="delivery"
        value="0"
        checked={props.delivery === "0"}
        onChange={props.handleDeliveryChange}
      />
      {" "}
      Pick-Up
    </label>
    <label>
      <input
        type="radio"
        name="delivery"
        value="1"
        checked={props.delivery === "1"}
        onChange={props.handleDeliveryChange}
      />
      {" "}
      In-Town
    </label>
    <label>
      <input
        type="radio"
        name="delivery"
        value="3"
        checked={props.delivery === "3"}
        onChange={props.handleDeliveryChange}
      />
      {" "}
      Out-of-Town
    </label>
  </div>
);

Delivery.propTypes = {
  delivery: PropTypes.string,
  handleDeliveryChange: PropTypes.func
}

export default Delivery;