import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "./header.css";
import { Link } from "react-router-dom";
const SideDrawer = props => {
  return (
      <Drawer
        anchor="left"
        open={props.open}
        onClose={() => props.onClose(false)}
      >
        <List component="nav" className="nav">
        <ListItem button onClick={() => console.log("Featured")}>
        <Link to='/'>Properties</Link>
          </ListItem>

          <ListItem button onClick={() => console.log("Featured")}>
            Realtors
          </ListItem>

          <ListItem button onClick={() => console.log("Featured")}>
          <Link to='/contact'>Contact Us</Link>
          </ListItem>

          <ListItem button onClick={() => console.log("Featured")}>
            <Link to='/about'>About Us</Link> 
          </ListItem>

          <ListItem button onClick={() => console.log("Featured")}>
            Location
          </ListItem>
        </List>
      </Drawer>
  );
};

export default SideDrawer;
