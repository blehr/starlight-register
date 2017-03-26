import React from "react";
import { Link } from "react-router";

const ItemsHeader = () => (
  <div className="items-header">
    <Link to="/pizzas" activeClassName="active-link" >Pizzas</Link>
    <Link to="/subs" activeClassName="active-link" >Subs</Link>
    <Link to="/salads" activeClassName="active-link" >Salads</Link>
    <Link to="/wings" activeClassName="active-link" >Wings</Link>
    <Link to="/breadsticks" activeClassName="active-link" >Breadsticks</Link>
    <Link to="/nachos" activeClassName="active-link" >Nachos</Link>
    <Link to="/dessert" activeClassName="active-link" >Dessert Pizza</Link>
    <Link to="/drinks" activeClassName="active-link" >Drinks</Link>
  </div>
);

export default ItemsHeader;
