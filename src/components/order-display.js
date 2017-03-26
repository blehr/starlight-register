import React, { PropTypes } from "react";
import moment from "moment";
import accounting from "accounting";
import OrderItemDisplay from "./order-item-display";
import TotalDisplay from "./total-display";
import PayNow from "./pay_now";

const OrderDisplay = props => (
  <div>
    {props.orders.map(o => {
      const keys = Object.keys(o);
      const order = o[keys[0]];
      const orderKey = keys[0];
      return (
        <div
          className={
            order.completed ? "single-order completed" : "single-order"
          }
          key={keys[0]}
        >
          {order.order &&
            order.order.map(i => (
              <OrderItemDisplay key={i.itemNumber} {...i} />
            ))}
          <div className="single-order-bottom">
            {order.name && <div>Name: {order.name}</div>}
            {order.phone && <div>Phone: {order.phone}</div>}
            {order.address && <div>Address: {order.address}</div>}
            <div>
              {order.delivery === "0"
                ? "Pick Up"
                : order.delivery === "1" ? "Delivery $1.00" : "Delivery $2.00"}
            </div>
            <div>Tip: {accounting.formatMoney(order.tip)}</div>
            <div>Discount: {accounting.formatMoney(order.amountOffTotal)}</div>
            <div>Total: {accounting.formatMoney(order.total)}</div>

            {/* button to send to pay route */}
            {!order.paid &&
              !props.isPay &&
              <div className="pay-buttons">
                <button
                  className="pay-now"
                  onClick={() => props.handleRouteToPay(orderKey, order)}
                >
                  {" "}Pay or Edit{" "}
                </button>
                <button
                  className="pay-now"
                  onClick={() => props.handleDeleteOrder(orderKey)}
                >
                  {" "}Delete{" "}
                </button>
              </div>}

            {/* display on pay route */}
            {!order.paid &&
              props.isPay &&
              <TotalDisplay
                total={order.total}
                handleAmountOffChange={props.handleAmountOffChange}
                handleAddTipChange={props.handleAddTip}
                tip={order.tip}
              >
                <PayNow
                  handlePayNowCredit={props.handlePayNowCredit}
                  handlePayNowCash={props.handlePayNowCash}
                />
              </TotalDisplay>}

            {/* display after paid */}

            {order.paid &&
              <div>paid w/ {order.credit ? "Credit" : "Cash"}</div>}

            <div>
              Created: {moment(order.createdAt).format("MMM D, hh:mm A")}
            </div>

            {/* display after order completed */}
            {order.completed &&
              <span>
                <div>
                  Completed:
                  {" "}
                  {moment(order.completedAt).format("MMM D, hh:mm A")}
                </div>
                <div>
                  Elapsed Time:
                  {" "}
                  {moment(order.completedAt).diff(
                    moment(order.createdAt),
                    "minutes"
                  )}
                  {" "}Minutes
                </div>
              </span>}

            {/* display when order is not completed */}
            {!order.completed &&
              <button
                className="pay-now"
                onClick={() => props.markAsComplete(orderKey)}
              >
                <i className="fa fa-check" /> Complete
              </button>}

          </div>
        </div>
      );
    })}
  </div>
);

OrderDisplay.propTypes = {
  handlePayNowCash: PropTypes.func
}

OrderDisplay.propTypes = {
  orders: PropTypes.array
};

export default OrderDisplay;
