import React, { PropTypes } from "react";
import accounting from 'accounting';

const ItemDisplay = props => (
  <div
    className={
      props.activeEditNumber ? "item-display active-button" : "item-display"
    }
    value={props.itemNumber}
  >
    <table>
      <tbody>
        <tr className="item-title">
          <td>{accounting.formatMoney(props.total)}</td>
          <td>
            {props.type} {props.name} {props.size}
          </td>
        </tr>
        {props.noTopping &&
          props.noTopping.length !== 0 &&
          <tr>
            <td>NO: </td>
            <td>{props.noTopping.map(t => `${t}, `)}</td>
          </tr>}
        {props.toppings &&
          props.toppings.length !== 0 &&
          <tr>
            <td>Toppings: </td>
            <td>{props.toppings.map(t => `${t}, `)}</td>
          </tr>}
        {props.firstSideToppings &&
          props.firstSideToppings.length !== 0 &&
          <tr>
            <td>Toppings/1: </td>
            <td>{props.firstSideToppings.map(t => `${t}, `)}</td>
          </tr>}
        {props.secondSideToppings &&
          props.secondSideToppings.length !== 0 &&
          <tr>
            <td>Toppings/2: </td>
            <td>{props.secondSideToppings.map(t => `${t}, `)}</td>
          </tr>}
        {props.extraMeat &&
          <tr>
            <td>Extra Meat: </td>
            <td>Yes</td>
          </tr>}
        {props.extraCheese &&
          <tr>
            <td>Extra Cheese: </td>
            <td>Yes</td>
          </tr>}
        {props.dressing &&
          <tr>
            <td>Dressing: </td>
            <td>{props.dressing}</td>
          </tr>}
        {props.custom !== "" &&
          <tr>
            <td>Custom: </td>
            <td>{props.custom}</td>
          </tr>}
        <tr>
          <td>
            {props.activeEditNumber
              ? <button onClick={props.handleResetEdit}>
                  <i className="fa fa-save" /> Save
                </button>
              : <button onClick={() => props.handleEditClick(props.itemNumber)}>
                  <i className="fa fa-pencil" /> Edit
                </button>}
          </td>
          <td>
            <button onClick={() => props.handleDeleteClick(props.itemNumber)}>
              <i className="fa fa-trash" /> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

ItemDisplay.propTypes = {
  activeEditNumber: PropTypes.bool,
  total: PropTypes.number,
  size: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  itemNumber: PropTypes.number,
  noTopping: PropTypes.array,
  toppings: PropTypes.array,
  firstSideToppings: PropTypes.array,
  secondSideToppings: PropTypes.array,
  extraMeat: PropTypes.bool,
  extraCheese: PropTypes.bool,
  custom: PropTypes.string,
  handleResetEdit: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleEditClick: PropTypes.func,
  dressing: PropTypes.string
};

export default ItemDisplay;
