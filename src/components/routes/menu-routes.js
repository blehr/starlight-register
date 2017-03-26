import React from 'react';
import Header from '../header';
import ItemsHeader from '../items-header';
import Footer from '../footer';
import SideBar from '../sidebar';
import OrderSidebar from '../order-sidebar';


const MenuRoutes = props => (
  <div className="site-wrapper">
    <Header />
    <ItemsHeader />
    <div className="container">
      <div className="menu">
        {props.children}
      </div>
      <SideBar />
      <OrderSidebar />
    </div>
    <Footer />
  </div>
);

export default MenuRoutes;
