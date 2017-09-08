import React, { Component } from 'react';


class DashboardItem extends Component {
 
  render() {
     
    return (

      <li className="Dashboard">
        {this.props.body.$class}

      </li>
    );
  }
}

export default DashboardItem;
