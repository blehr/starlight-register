import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { withRouter, browserHistory } from "react-router";
import * as actions from "../actions";
import OrderDisplay from "./order-display";

class OrderSidebar extends Component {
  constructor(props) {
    super(props);

    this.markOrderAsComplete = this.markOrderAsComplete.bind(this);
    this.handleRouteToPay = this.handleRouteToPay.bind(this);
    this.setPayOrderFlag = this.setPayOrderFlag.bind(this);
    this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
  }
  componentDidMount() {
    this.props.retrieveOrders();
  }
  setPayOrderFlag() {
    this.props.setPayOrderFlag();
  }
  markOrderAsComplete(x) {
    this.props.markAsComplete(x);
  }
  handleRouteToPay(key, order) {
    this.props.setPayOrderFlag();
    this.props.setOrderToPay(key, order);
    browserHistory.push("/pizzas");
  }
  handleDeleteOrder(key) {
    this.props.deleteOrder(key);
  }
  render() {
    return (
      <div
        className={
          this.props.router.location.pathname === "/orders"
            ? "orders"
            : "order-sidebar"
        }
      >
        <OrderDisplay
          orders={this.props.savedOrders}
          markAsComplete={this.markOrderAsComplete}
          handleRouteToPay={this.handleRouteToPay}
          handleDeleteOrder={this.handleDeleteOrder}
          setPayOrderFlag={this.setPayOrderFlag}
        />
      </div>
    );
  }
}

OrderSidebar.propTypes = {
  savedOrders: PropTypes.array,
  markAsComplete: PropTypes.func,
  retrieveOrders: PropTypes.func,
  setPayOrderFlag: PropTypes.func,
  setOrderToPay: PropTypes.func,
  router: PropTypes.object,
  deleteOrder: PropTypes.func
};

const mapStateToProps = ({ savedOrders }) => ({
  savedOrders: savedOrders.orders
});

export default connect(mapStateToProps, actions)(withRouter(OrderSidebar));
