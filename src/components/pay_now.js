import React, { PropTypes } from "react";

const PayNow = props => (
  <div className="pay-buttons">
    <button
      onClick={props.handlePayNowCash}
      className="pay-now"
      disabled={!props.haveOrders}
    >
      Cash
    </button>
    <button
      onClick={props.handlePayNowCredit}
      className="pay-now"
      disabled={!props.haveOrders}
    >
      Credit
    </button>
  </div>
);

PayNow.propTypes = {
  handlePayNowCash: PropTypes.func,
  handlePayNowCredit: PropTypes.func,
  haveOrders: PropTypes.bool
};

export default PayNow;
