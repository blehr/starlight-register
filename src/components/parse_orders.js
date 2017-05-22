import React, { PropTypes } from 'react';
import accounting from "accounting";

function getCashTotals(arr) {
  const cash = [];
  arr.forEach(o => {
    if (!o.credit) {
      cash.push(o.total);
    } 
  });

  return cash.reduce((a, b) => a + b, 0);
}

function getCreditTotals(arr) {
  const credit = [];
  arr.forEach(o => {
    if (o.credit) {
      credit.push(o.total);
    } 
  });

  return credit.reduce((a, b) => a + b, 0);
}

function getTotal(arr) {
  const total = [];
  arr.forEach(o => {
    total.push(o.total);
  });

  return total.reduce((a, b) => a + b, 0);
}

function getNumberOfPickups(arr) {
  let counter = 0;
  arr.forEach(o => {
    if (!o.delivery) {
      counter++
    }
  });
  return counter;
}

function getNumberOfDeliveries(arr) {
  let counter = 0;
  arr.forEach(o => {
    if (o.delivery) {
      counter++
    }
  });
  return counter;
}

function getNumberOfOrders(arr) {
  return arr.length;
}


const ParseOrders = ({ orders }) => {
  return (
    <div className="dash-table">
      <table>
        <tbody>
          <tr>
            <td>Cash:</td>
            <td>{ accounting.formatMoney(getCashTotals(orders)) }</td>
          </tr>
          <tr>
            <td>Credit:</td>
            <td>{ accounting.formatMoney(getCreditTotals(orders)) }</td>
          </tr>
          <tr>
            <td>Total:</td>
            <td>{ accounting.formatMoney(getTotal(orders)) }</td>
          </tr>
          <tr>
            <td>Pickups:</td>
            <td>{ getNumberOfPickups(orders) }</td>
          </tr>
          <tr>
            <td>Deliveries:</td>
            <td>{ getNumberOfDeliveries(orders) }</td>
          </tr>
          <tr>
            <td>Total Orders:</td>
            <td>{ getNumberOfOrders(orders) }</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ParseOrders.propTypes = {
  orders: PropTypes.array
};

export default ParseOrders;