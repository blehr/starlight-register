import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import MenuItem from "./menu-item";
import TextInput from "./text-input";
import Menu from "../json/menu.json";
import * as actions from "../actions/index";

class BuildItem extends Component {
  constructor(props) {
    super(props);
    this.createItem = this.createItem.bind(this);
    this.createItemAndDisable = this.createItemAndDisable.bind(this);
    this.handleToppingsClick = this.handleToppingsClick.bind(this);
    this.handleFirstSideToppingsClick = this.handleFirstSideToppingsClick.bind(
      this
    );
    this.handleSecondSideToppingsClick = this.handleSecondSideToppingsClick.bind(
      this
    );
    this.handleExtraCheeseClick = this.handleExtraCheeseClick.bind(this);
    this.handleExtraMeatClick = this.handleExtraMeatClick.bind(this);
    this.handleNoToppingClick = this.handleNoToppingClick.bind(this);
    this.handleTypeClick = this.handleTypeClick.bind(this);
    this.handleDressingClick = this.handleDressingClick.bind(this);
  }
  componentDidMount() {
    this.props.enableButtons();
  }
  createItem(x) {
    this.props.createNewItem(x);
    this.props.enableButtons();
  }
  createItemAndDisable(x) {
    this.props.createNewItem(x);
    this.props.disableButtons();
  }
  handleToppingsClick(x) {
    this.props.toppingClick(x);
  }
  handleFirstSideToppingsClick() {
    this.props.selectFirstSideToppings();
  }
  handleSecondSideToppingsClick() {
    this.props.selectSecondSideToppings();
  }
  handleExtraCheeseClick() {
    this.props.extraCheeseClick();
  }
  handleExtraMeatClick() {
    this.props.extraMeatClick();
  }
  handleNoToppingClick() {
    this.props.selectNoTopping();
  }
  handleTypeClick(x) {
    this.props.typeClick(x);
  }
  handleDressingClick(x) {
    this.props.dressingClick(x);
  }
  render() {
    const { category } = this.props;
    return (
      <div className="menu-key-container">
        <div className="create-item">
          <p>Start Here</p>
          <div className="flex-row">
            {Menu[`${category}`].size.map(p => (
              <MenuItem
                key={p.name + " " + p.size}
                passClassName="menu-item"
                name={p.name + " " + p.size}
                value={p}
                handleClick={
                  p.disableFlag ? this.createItemAndDisable : this.createItem
                }
              />
            ))}
          </div>
        </div>
        {Menu[`${category}`].type &&
          <span>
            <p>Type</p>
            <div className="flex-row">
              {Menu[`${category}`].type.map(p => (
                <MenuItem
                  key={p}
                  passClassName="menu-item"
                  name={p}
                  value={{
                    type: p
                  }}
                  isDisabled={this.props.isDisabled}
                  handleClick={this.handleTypeClick}
                />
              ))}

            </div>
          </span>}

        {Menu[category].dressing &&
          <span>
            <p>Dressing</p>
            <div className="flex-row">
              {Menu[category].dressing.map(p => (
                <MenuItem
                  key={p}
                  name={p}
                  value={{ dressing: p }}
                  passClassName="menu-item"
                  handleClick={this.handleDressingClick}
                />
              ))}
            </div>
          </span>}

        {Menu[category].toppings &&
          <span>
            <p>Toppings</p>
            <div className="flex-row">
              {category === "pizza" &&
                <MenuItem
                  name="1st Side"
                  passClassName={
                    this.props.firstSideToppings
                      ? "menu-item special-button active-button"
                      : "menu-item special-button"
                  }
                  value={this.props.firstSideToppings}
                  handleClick={this.handleFirstSideToppingsClick}
                />}
              {category === "pizza" &&
                <MenuItem
                  name="2nd Side"
                  passClassName={
                    this.props.secondSideToppings
                      ? "menu-item special-button active-button"
                      : "menu-item special-button"
                  }
                  value={this.props.secondSideToppings}
                  handleClick={this.handleSecondSideToppingsClick}
                />}
              <MenuItem
                name="NO"
                passClassName={
                  this.props.noTopping
                    ? "menu-item special-button active-button"
                    : "menu-item special-button"
                }
                value={this.props.noTopping}
                handleClick={this.handleNoToppingClick}
              />
              {(category === "pizza" || category === "subs") &&
                <MenuItem
                  name="Extra Cheese"
                  value="cheese"
                  passClassName="menu-item special-button"
                  handleClick={this.handleExtraCheeseClick}
                />}
              {category === "subs" &&
                <MenuItem
                  name="Extra Meat"
                  value="meat"
                  passClassName="menu-item special-button"
                  handleClick={this.handleExtraMeatClick}
                />}
            </div>
            <div className="flex-row">
              {Menu[category].toppings.map(p => (
                <MenuItem
                  key={p}
                  name={p}
                  value={p}
                  passClassName="menu-item"
                  handleClick={this.handleToppingsClick}
                  isDisabled={
                    category === "breadsticks" ? this.props.isDisabled : false
                  }
                />
              ))}
            </div>
          </span>}

        <p>Customize</p>
        <div className="flex-row">
          <TextInput />
        </div>
      </div>
    );
  }
}

BuildItem.propTypes = {
  firstSideToppings: PropTypes.bool.isRequired,
  secondSideToppings: PropTypes.bool.isRequired,
  createNewItem: PropTypes.func.isRequired,
  toppingClick: PropTypes.func.isRequired,
  selectFirstSideToppings: PropTypes.func.isRequired,
  selectSecondSideToppings: PropTypes.func.isRequired,
  extraCheeseClick: PropTypes.func.isRequired,
  selectNoTopping: PropTypes.func,
  noTopping: PropTypes.bool,
  enableButtons: PropTypes.func,
  disableButtons: PropTypes.func,
  isDisabled: PropTypes.bool,
  extraMeatClick: PropTypes.func,
  typeClick: PropTypes.func,
  dressingClick: PropTypes.func,
  category: PropTypes.string
};

const mapStateToProps = ({ order }) => ({
  order: order.order,
  currentItemNumber: order.currentItemNumber,
  total: order.total,
  firstSideToppings: order.firstSideToppings,
  secondSideToppings: order.secondSideToppings,
  editItemNumber: order.editItemNumber,
  noTopping: order.noTopping,
  isDisabled: order.isDisabled
});

export default connect(mapStateToProps, actions)(BuildItem);
