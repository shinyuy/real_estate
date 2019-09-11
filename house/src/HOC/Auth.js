import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Search from "../components/search/Search";
import "./hoc.css";

export default function(ComposedClass, reload, adminRoute) {
  class AuthCheck extends Component {
    state = {
      loading: true,
      user: null
    };

    componentDidMount() {
      axios.get("http://localhost:3000/api/auth").then(res => {
        let user = res.data;
        if (!user.isAuth) {
          if (reload) {
            this.props.history.push("/login");
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push("/user/dashboard");
          } else {
            if (reload === false) {
              this.props.history.push("/user/dashboard");
            }
          }
        }
        this.setState({
          loading: false,
          user: user
        });
      });
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2196F3" }} thickness={7} />
          </div>
        );
      }
      return (
        <div className="container">
          <Header {...this.props} user={this.state.user} />
          <Search />
          <ComposedClass {...this.props} user={this.state.user} />
          <Footer />
        </div>
      );
    }
  }
  return AuthCheck;
}
