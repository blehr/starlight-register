import React, { PropTypes } from "react";

const PlaceOrder = props => (
  <div className="pay-buttons">
    <button
      onClick={props.handlePlaceOrder}
      className="place-order"
      disabled={!props.haveOrders}
    >
      Place Order
    </button>
    <button
      onClick={props.handleCancelOrder}
      className="place-order"
      disabled={!props.haveOrders}
    >
      Cancel
    </button>
  </div>
);

PlaceOrder.propTypes = {
  handlePlaceOrder: PropTypes.func,
  handleCancelOrder: PropTypes.func,
  haveOrders: PropTypes.bool
};

export default PlaceOrder;
