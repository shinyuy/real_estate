import React, { Component } from "react";
import "./header.css";
import SideDrawer from "./SideDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import number from "../../img/icons8-phone-64.png";
import axios from "axios";

export default class Header extends Component {
  state = {
    agent: [],
    name: "",
    agency: "",
    images: [],
    drawerOpen: false,
    headerShow: false
  };

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/getagents")
      .then(res => this.setState({ agent: res.data }))
      .catch(function(error) {
        console.log(error);
      });
  }

  toggleDrawer = value => {
    this.setState({
      drawerOpen: value
    });
  };

  render() {
    const { agent } = this.state;
    return (
      <>
        <div className="sidebar">
          <IconButton
            aria-label="Menu"
            color="inherit"
            onClick={value => this.toggleDrawer(value)}
          >
            <MenuIcon className="nav-btn" />
          </IconButton>

          <SideDrawer
            open={this.state.drawerOpen}
            onClose={value => this.toggleDrawer(value)}
          />
        </div>
        <div className="header">
          <div className="language">En/Fr</div>
          <div>
            <ul className="header__seenon-logos">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/properties">Rentals</Link>
              </li>
              <li>
                <Link to="/properties">Sales</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div />
          <h1 className="heading-1">Cameroon Real Estate Properties</h1>
          <button className="btn header__btn">View our properties</button>
          <div className="number">
            <img src={number} alt="Number" /> 674809182 or 695958321
          </div>
        </div>
        <div className="realtors">
        <h3 class="heading-3">Top 3 Real Estate Agents</h3>
          <div className="realtors__list">
            {agent.length <= 0
              ? `Loading Agents`
              : agent.data.map(function(dat, i) {
                  return (
                    <>
                      <img
                        src={dat.images[0].url}
                        alt="Realtor 1"
                        className="realtors__img"
                      />
                      <div className="realtors__details">
                        <h4 className="heading-4 heading-4--light">
                          {dat.name}
                        </h4>
                        <p className="realtors__sold">{dat.agency}</p>
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      </>
    );
  }
}
