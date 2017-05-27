import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import ParseOrders from "./parse_orders";
import MonthChart from "./month_chart";

class DashboardLayout extends Component {
  componentDidMount() {
    this.props.retrieveOrdersYesterday();
    this.props.retrieveOrdersMonth();
  }
  render() {
    return (
      <div style={{width: "100%"}}>
        <div className="flex-dash-row">
          <div>
            <h1>Today</h1>
            <ParseOrders orders={this.props.savedOrders} />
          </div>
          <div>
            <h1>Yesterday</h1>
            <ParseOrders orders={this.props.yesterdayOrders} />
          </div>
          <div>
            <h1>Month</h1>
            <ParseOrders orders={this.props.monthOrders} month />
          </div>
        </div>
        <MonthChart orders={this.props.monthOrders} />
      </div>
    );
  }
}

DashboardLayout.propTypes = {
  savedOrders: PropTypes.array,
  retrieveOrdersYesterday: PropTypes.func,
  retrieveOrdersMonth: PropTypes.func,
  yesterdayOrders: PropTypes.array,
  monthOrders: PropTypes.array
};

const mapStateToProps = ({ savedOrders }) => ({
  savedOrders: savedOrders.orders,
  yesterdayOrders: savedOrders.yesterdayOrders,
  monthOrders: savedOrders.monthOrders
});

export default connect(mapStateToProps, actions)(DashboardLayout);
