import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import OrderDisplay from "./order-display";



class DashboardLayout extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    this.props.retreiveOrders();
  }
  render() {
    return (
      <div className="flex-row" >
        <div className="dashboard-col"><h1>Dash</h1></div>
        <div className="dashboard-col"><h1>Dash</h1></div>
        <div className="dashboard-col"><h1>Dash</h1></div>
      </div>  
    );
  }
}

DashboardLayout.propTypes = {
  savedOrders: PropTypes.array,
  markAsComplete: PropTypes.func,
  retreiveOrders: PropTypes.func
};

const mapStateToProps = ({ savedOrders }) => ({
  savedOrders: savedOrders.orders
});

export default connect(mapStateToProps, actions)(DashboardLayout);
