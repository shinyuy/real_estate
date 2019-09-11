import React from "react"; 
import "./App.css";
import Layout from "./HOC/Layout";
import Home from "./components/home/Home";
import Result from "./components/home/Result";
import HomeDetails from "./components/home/HomeDetails";
import { Route, Switch } from "react-router-dom";
import Auth from "./HOC/Auth"; 
import Dashboard from "./components/admin/Dashboard";
import NotFound from "./components/utils/NotFound";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import AddEditProperty from "./components/admin/properties/AddEditProperty";
import AdminProperties from "./components/admin/properties/index";
import AddEditRealtor from "./components/admin/realtors/AddEditRealtor";
import AdminRealtors from "./components/admin/realtors/index";
import Owners from "./components/admin/owners/index";
import Login from "./components/login/Login";

const Routes = props => {
  return (
      <Layout auth={Auth}>
        <Switch>
        <Route exact path="/" component={Auth(Home, null, false)} />
        <Route exact path="/admin_realtors/add_realtor" component={Auth(AddEditRealtor, true, true)} />
        <Route exact path="/admin_realtors/add_realtor/:id" component={Auth(AddEditRealtor, true, true)} />  
        <Route exact path="/admin_realtors" component={Auth(AdminRealtors, true, true)} />
        <Route exact path="/admin_properties/edit_property" component={Auth(AddEditProperty, true, true)} />
        <Route exact path="/admin_properties/edit_property/:id" component={Auth(AddEditProperty, true, true)} />
        <Route exact path="/admin_properties" component={Auth(AdminProperties, true, true)} />
        <Route exact path="/admin_owners" component={Auth(Owners, true, true)} />
        <Route exact path="/dashboard" component={Auth(Dashboard, true, true)} />
        <Route exact path="/properties" component={Auth(Result, null, false)} />
        <Route exact path="/home/:_id" component={Auth(HomeDetails, null, false)} />
        <Route exact path="/contact" component={Auth(Contact, null, false)} />
        <Route exact path="/about" component={Auth(About, null, false)} />
        <Route exact path="/login" component={Auth(Login, null, false)} />
        <Route  component={Auth(NotFound, null, false)} />
        </Switch>
      </Layout>
  );
}

export default Routes;
