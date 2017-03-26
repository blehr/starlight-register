import React from "react";
import MenuRoutes from './menu-routes';
import BuildItem from "../build-item";


const Pizza = () => (
  <MenuRoutes>
    <BuildItem category="pizza" />
  </MenuRoutes>
);

export default Pizza;
