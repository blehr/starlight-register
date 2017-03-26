import React from "react";
import { Route } from "react-router";

import App from "./components/app";
import Pizza from "./components/routes/pizza";
import Subs from "./components/routes/subs";
import Salads from "./components/routes/salads";
import Wings from "./components/routes/wings";
import Breadsticks from "./components/routes/breadsticks";
import Nachos from "./components/routes/nachos";
import Dessert from "./components/routes/dessert";
import Drinks from "./components/routes/drinks";
import Orders from "./components/routes/orders";
import Dashboard from "./components/routes/dashboard";
import SquareResponse from "./components/routes/square_response";
import RequireAuth from "./components/requireAuth";

export default (
  <div>
    <Route path="/" component={App} />
    <Route path="/pizzas" component={RequireAuth(Pizza)} />
    <Route path="/subs" component={RequireAuth(Subs)} />
    <Route path="/salads" components={RequireAuth(Salads)} />
    <Route path="/wings" component={RequireAuth(Wings)} />
    <Route path="/breadsticks" component={RequireAuth(Breadsticks)} />
    <Route path="/nachos" component={RequireAuth(Nachos)} />
    <Route path="/dessert" component={RequireAuth(Dessert)} />
    <Route path="/drinks" component={RequireAuth(Drinks)} />
    <Route path="/orders" component={RequireAuth(Orders)} />
    <Route path="/dashboard" component={RequireAuth(Dashboard)} />
    <Route path="/square" component={RequireAuth(SquareResponse)} />
  </div>
);
