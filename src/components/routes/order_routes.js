import React from 'react';
import Header from '../header';
import Footer from '../footer';


const OrderRoutes = props => (
  <div className="site-wrapper">
    <Header />
    <div className="container">
      {props.children}
    </div>
    <Footer />
  </div>
);

export default OrderRoutes;
