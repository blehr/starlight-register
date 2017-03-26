import React, { PropTypes } from "react";
import accounting from "accounting";

const TotalDisplay = props => (
  <div className="total">
    <div className="flex-between">
      <div>
        -$
        {" "}
        <input
          type="text"
          value={props.amountOffTotal}
          className="total-offset"
          placeholder="Discount"
          onChange={props.handleAmountOffChange}
        />
      </div>
      <div>
        +$
        {" "}
        <input
          type="text"
          value={props.tip}
          className="total-offset"
          placeholder="Add Tip"
          onChange={props.handleAddTipChange}
        />
      </div>
    </div>
    <h4>Total: {accounting.formatMoney(props.total)}</h4>
    {props.children}
  </div>
);

TotalDisplay.propTypes = {
  total: PropTypes.number,
  handlePlaceOrder: PropTypes.func,
  handleAmountOffChange: PropTypes.func,
  amountOffTotal: PropTypes.string,
  tip: PropTypes.string,
  haveOrders: PropTypes.bool,
  handleAddTipChange: PropTypes.func
};

export default TotalDisplay;
