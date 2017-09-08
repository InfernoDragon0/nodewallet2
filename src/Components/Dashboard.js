import React, { Component } from 'react';
import DashboardRow from './DashboardRow'


class Dashboard extends Component {

  render() {
    let DashboardItem;
    var counter = 0
    if (this.props.bodys) {
      DashboardItem = this.props.bodys.map(body => {

        console.log("hahaduedue" + this.props.bodys[0].$class)

      })
    }
        return (
          <div>
            <div className="Dashboard">
            <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Transaction Class</th>
                <th>Client ID</th>
                <th>Merchant ID</th>
                <th>Transaction Type</th>
              </tr>
              
            </thead>
           <DashboardRow bodys={this.props.bodys}/>
            
            
            </table>
            
            </div>
          </div>
        );
     
    };
  }


export default Dashboard;


