import React, { Component } from 'react';



class DashboardRow extends Component {
  

  render() {
    let DashboardItem;
    if (this.props.bodys) {
      DashboardItem = this.props.bodys.map(body => {
        // console.log(this.props.bodys.length);
      })
    }
    let bodylength = this.props.bodys.length
    var row = [];
    
    for (var counter=0; counter<bodylength; counter++) {
      if (this.props.bodys[counter].$class == "org.acme.jenetwork.walletTransactionPay" || this.props.bodys[counter].$class == "org.acme.jenetwork.walletTransactionRefund" || this.props.bodys[counter].$class == "org.acme.jenetwork.walletTransactionTopUp") {
        row.push(<tr>
          <td>{this.props.bodys[counter].transactionId}</td>
          <td>{this.props.bodys[counter].timestamp}</td>
          <td>{this.props.bodys[counter].amount}</td>
          <td>--</td>
          <td>{this.props.bodys[counter].asset}</td>
          <td>{this.props.bodys[counter].asset2}</td>
          <td>{this.props.bodys[counter].$class}</td>
          </tr>);
      }
      else if (this.props.bodys[counter].$class = "org.hyperledger.composer.system.AddAsset"){
        if (this.props.bodys[counter].resources[0].$class == "org.acme.jenetwork.clientWallet") {
        row.push(<tr>
          <td>{this.props.bodys[counter].transactionId}</td>
          <td>{this.props.bodys[counter].timestamp}</td>
          <td>{this.props.bodys[counter].resources[0].value}</td>
          <td>{this.props.bodys[counter].resources[0].$class}</td>
          <td>{this.props.bodys[counter].resources[0].clientWalletID}</td>
          <td>--</td>
          <td>{this.props.bodys[counter].$class}</td>
          </tr>);
        }
        else if (this.props.bodys[counter].resources[0].$class == "org.acme.jenetwork.merchantWallet") {
          row.push(<tr>
            <td>{this.props.bodys[counter].transactionId}</td>
            <td>{this.props.bodys[counter].timestamp}</td>
            <td>{this.props.bodys[counter].resources[0].value}</td>
            <td>{this.props.bodys[counter].resources[0].$class}</td>
            <td>--</td>
            <td>{this.props.bodys[counter].resources[0].merchantWalletID}</td>
            <td>{this.props.bodys[counter].$class}</td>
            </tr>);
          };
      };
    };
    return (

      <tbody>
      {row}
      </tbody>

    );

  }
}
export default DashboardRow;
