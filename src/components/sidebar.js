import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";
import ItemDisplay from "./item-display";
import TotalDisplay from "./total-display";
import PlaceOrder from "./place-order";
import PayNow from "./pay_now";
import CustomerInput from "./customer-input";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleResetEdit = this.handleResetEdit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleAmountOffChange = this.handleAmountOffChange.bind(this);
    this.handlePayNowCash = this.handlePayNowCash.bind(this);
    this.handleAddTip = this.handleAddTip.bind(this);
    this.handlePayNowCredit = this.handlePayNowCredit.bind(this);
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleCancelOrder = this.handleCancelOrder.bind(this);
  }
  handleEditClick(num) {
    this.props.setEditItemNumber(num);
  }
  handleResetEdit() {
    this.props.resetEditItemNumber();
  }
  handleDeleteClick(n) {
    this.props.deleteItem(n);
  }
  handleAmountOffChange(e) {
    this.props.setAmountOffTotal(e.target.value);
  }
  handleAddTip(e) {
    this.props.addTip(e.target.value);
  }
  handlePlaceOrder() {
    this.props.saveOrder(this.props.orderState);
  }
  handlePayNowCredit() {
    this.props.saveOrderCredit(this.props.orderState);
  }
  handlePayNowCash() {
    this.props.saveOrderCash(this.props.orderState);
  }
  handleCancelOrder() {
    this.props.resetOrderState();
  }
  render() {
    return (
      <div className="sidebar">
        <CustomerInput />
        <div className="sidebar-items">
          {this.props.order
            .sort((a, b) => b.itemNumber - a.itemNumber)
            .map(o => (
              <ItemDisplay
                key={o.itemNumber}
                handleEditClick={this.handleEditClick}
                handleDeleteClick={this.handleDeleteClick}
                handleResetEdit={this.handleResetEdit}
                activeEditNumber={o.itemNumber === this.props.editItemNumber}
                {...o}
              />
            ))}
        </div>
        <div>
          <TotalDisplay
            total={this.props.total}
            handlePayNowCredit={this.handlePayNowCredit}
            handlePayNowCash={this.handlePayNowCash}
            handleAmountOffChange={this.handleAmountOffChange}
            handleAddTipChange={this.handleAddTip}
            tip={this.props.tip}
            amountOffTotal={this.props.amountOffTotal}
          >
            <PlaceOrder
              handlePlaceOrder={this.handlePlaceOrder}
              haveOrders={this.props.order.length > 0}
              handleCancelOrder={this.handleCancelOrder}
            />
            <PayNow
              handlePayNowCredit={this.handlePayNowCredit}
              handlePayNowCash={this.handlePayNowCash}
              haveOrders={this.props.order.length > 0}
            />

          </TotalDisplay>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  total: PropTypes.number,
  name: PropTypes.string,
  phone: PropTypes.string,
  address: PropTypes.string,
  amountOffTotal: PropTypes.string,
  delivery: PropTypes.string,
  order: PropTypes.array,
  setEditItemNumber: PropTypes.func,
  resetEditItemNumber: PropTypes.func,
  deleteItem: PropTypes.func,
  editItemNumber: PropTypes.number,
  saveOrderCredit: PropTypes.func,
  saveOrderCash: PropTypes.func,
  saveOrder: PropTypes.func,
  resetOrderState: PropTypes.func,
  setAmountOffTotal: PropTypes.func,
  addTip: PropTypes.func,
  tip: PropTypes.string,
  orderState: PropTypes.object
};

const mapStateToProps = ({ order }) => ({
  orderState: order,
  order: order.order,
  currentItemNumber: order.currentItemNumber,
  editItemNumber: order.editItemNumber,
  total: order.total,
  firstSideToppings: order.firstSideToppings,
  secondSideToppings: order.secondSideToppings,
  name: order.name,
  phone: order.phone,
  address: order.address,
  amountOffTotal: order.amountOffTotal,
  delivery: order.delivery,
  tip: order.tip
});

export default connect(mapStateToProps, actions)(SideBar);
