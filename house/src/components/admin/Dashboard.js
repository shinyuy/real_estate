import React, { Component } from 'react'
import AdminLayout from '../../HOC/AdminLayout';
import './admin.css';

export default class Dashboard extends Component {


  render() {
    return (
      <AdminLayout>
          <div className='user_dashboard_container'>
            <div className='user_dashboard'>
              <h3>This is your dashboard</h3> 
            </div>   
          </div>
      </AdminLayout>
    )
  }

}