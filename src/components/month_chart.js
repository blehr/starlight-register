import React, { PropTypes } from "react";
import moment from 'moment';
import accounting from "accounting";
import ParseOrders from "./parse_orders";
import Bar from "./bar";
import {
  getCashTotals,
  getCreditTotals,
  getTotal,
  getNumberOfPickups,
  getNumberOfDeliveries,
  getNumberOfOrders,
  getTodayDate,
  createDateObjects,
  sortByDays
} from "../utils/parse_order_helper";

const MonthChart = props => (
  <div className="bar-chart-div">
    {sortByDays(props.orders).map((day, i) => {
      return (
        <Bar
          styles={{
            height: getTotal(day) / 900 * 100 + "%",
            width: 1000 / moment().date() + "px"
          }}
          key={i}
          day={day}
          title={`${moment().month() + 1}/${i + 1} ${accounting.formatMoney(getTotal(day))}`}
        />
      );
    })}
  </div>
);

MonthChart.propTypes = {
  orders: PropTypes.array
};

export default MonthChart;
