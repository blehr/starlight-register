import React, { PropTypes } from "react";
import accounting from "accounting";
import moment from "moment";
import {
  getCashTotals,
  getCreditTotals,
  getTotal,
  getNumberOfPickups,
  getNumberOfDeliveries,
  getNumberOfOrders
} from "../utils/parse_order_helper";

const ParseOrders = ({ orders, month }) => {
  return (
    <div className="dash-table">
      <table>
        <thead>
          <tr>
            <td>
              {orders[0] &&
                (!month
                  ? moment(orders[0].createdAt).format("MMM DD")
                  : moment(orders[0].createdAt).format("MMM"))}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Cash:</td>
            <td>{accounting.formatMoney(getCashTotals(orders))}</td>
          </tr>
          <tr>
            <td>Credit:</td>
            <td>{accounting.formatMoney(getCreditTotals(orders))}</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>{accounting.formatMoney(getTotal(orders))}</td>
          </tr>
          <tr>
            <td>Pickups:</td>
            <td>{getNumberOfPickups(orders)}</td>
          </tr>
          <tr>
            <td>Deliveries:</td>
            <td>{getNumberOfDeliveries(orders)}</td>
          </tr>
          <tr>
            <td>Total Orders:</td>
            <td>{getNumberOfOrders(orders)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ParseOrders.propTypes = {
  orders: PropTypes.array,
  month: PropTypes.bool
};

export default ParseOrders;
