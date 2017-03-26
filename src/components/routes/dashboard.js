import React from 'react';
import OrderRoutes from './order_routes';
import DashboardLayout from '../dashboard_layout';

const Dashboard = () => (
  <OrderRoutes>
    <DashboardLayout />
  </OrderRoutes>
);

export default Dashboard;