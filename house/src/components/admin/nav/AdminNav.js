import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import axios from 'axios';
import '../admin.css';
 
const links = [
        {
            title: 'Properties',
            linkTo: '/admin_properties'
        },
        {
            title: 'Add Property',
            linkTo: '/admin_properties/edit_property'
        },
        {
            title: 'Realtors',
            linkTo: '/admin_realtors'
        },
        {
            title: 'Add Realtor',
            linkTo: '/admin_realtors/add_realtor'
        },
        {
            title: 'Owners',
            linkTo: '/admin_Owners'
        }
    ]
    
    const style = {
        color: 'white',
        fontWeight: '300',
        borderBottom: '1px solid #353535',
        fontSize: '1.9rem',
        fontFamily: 'Josefin Sans sans-serif',
    }

    const renderItems = () => (
         links.map(link => (
            <Link to={link.linkTo} key={link.title}>
              <ListItem button style={style}>
                  {link.title}
              </ListItem>
            </Link>
         ))
    )

class AdminNav extends Component  {

    logoutHandler = () => {
        axios
          .get("http://localhost:3000/api/logout")
          .then(res => {
            if (res.data.success) {
              this.props.history.push("/");
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      };
render () {
    return (
        <div className='links'>
            {renderItems()}
            <ListItem button style={style} onClick={()=> this.logoutHandler()}>
                Log out
            </ListItem>
        </div>
    )
}
}

export default AdminNav;
