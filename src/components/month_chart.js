import React, { Component, PropTypes } from "react";
import moment from "moment";
import accounting from "accounting";
import Bar from "./bar";
import { getTotal, sortByDays } from "../utils/parse_order_helper";

let width = 1000;

class MonthChart extends Component {
  componentDidMount() {
    width = this.getWidth('.bar-chart-div');
  }
  
  getWidth(elem) {
    const el = document.querySelector(elem);
    return el.clientWidth;
  }

  render() {
    return (
      <div className="bar-chart-div">
        {sortByDays(this.props.orders).map((day, i) => (
          <Bar
            styles={{
              height: getTotal(day) / 900 * 100 + "%",
              width:  width / moment().date() + "px"
            }}
            key={i}
            day={day}
            title={`${moment().month() + 1}/${i + 1} ${accounting.formatMoney(getTotal(day))}`}
          />
        ))}
      </div>
    )
  }
  
};

MonthChart.propTypes = {
  orders: PropTypes.array
};

export default MonthChart;
