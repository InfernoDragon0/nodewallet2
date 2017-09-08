import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard'


class App extends Component {
  constructor() {
    super();
    this.state = {
      bodys: []
    }
  }
  componentWillMount() {
    this.setState({
      bodys: [
        {
          "$class": "org.acme.jenetwork.walletTransactionPay",
          "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
          "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
          "amount": 2,
          "transactionId": "1acce36f-064c-4302-aa86-fcefeeda3cf7",
          "timestamp": "2017-08-31T06:39:49.225Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.clientWallet",
            "clientWalletID": "clientWalletID:123",
            "clientID": "123",
            "value": 0
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.clientWallet",
          "transactionId": "23a12cbd-7aa6-465f-b8f7-625799b05479",
          "timestamp": "2017-08-31T06:35:41.696Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.merchantWallet",
            "merchantWalletID": "merchantWalletID:12",
            "merchantID": "12",
            "value": 0
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.merchantWallet",
          "transactionId": "319c804d-de26-40a4-b932-c4fd43e6f8c0",
          "timestamp": "2017-08-31T06:46:57.839Z"
        },

        {
          "$class": "org.acme.jenetwork.walletTransactionPay",
          "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
          "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
          "amount": 10,
          "transactionId": "3ec739a7-2f09-4dcb-af0c-e42b0077402b",
          "timestamp": "2017-08-31T07:15:05.699Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.merchantWallet",
            "merchantWalletID": "merchantWalletID:123",
            "merchantID": "123",
            "value": 0
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.merchantWallet",
          "transactionId": "43395aee-fc30-432c-a89c-21579c676e58",
          "timestamp": "2017-08-31T06:26:44.036Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.merchantWallet",
            "merchantWalletID": "merchantWalletID:12345",
            "merchantID": "12345",
            "value": 0
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.merchantWallet",
          "transactionId": "ca8b2e5d-bff3-413b-89e0-95a8eef3a97c",
          "timestamp": "2017-08-31T06:45:23.619Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.clientWallet",
            "clientWalletID": "walletID:123",
            "clientID": "123",
            "value": 100
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.clientWallet",
          "transactionId": "df6ed1c9-cd3b-44eb-8107-a91eb26228c4",
          "timestamp": "2017-08-31T06:25:45.419Z"
        },

        {
          "$class": "org.hyperledger.composer.system.AddAsset",
          "resources":
          [{
            "$class": "org.acme.jenetwork.clientWallet",
            "clientWalletID": "clientWalletID:12345",
            "clientID": "12345",
            "value": 100
          }],
          "registryType": "Asset",
          "registryId": "org.acme.jenetwork.clientWallet",
          "transactionId": "e49109fb-cc49-41fa-b404-597e86003167",
          "timestamp": "2017-08-31T06:26:29.714Z"
        },

        {
          "$class": "org.acme.jenetwork.walletTransactionPay",
          "asset": "resource:org.acme.jenetwork.clientWallet#clientWalletID:12345",
          "asset2": "resource:org.acme.jenetwork.merchantWallet#merchantWalletID:123",
          "amount": 5,
          "transactionId": "ecbd9884-e4f6-4bca-84eb-00700fed9c0b",
          "timestamp": "2017-08-31T06:27:23.383Z"
        }]
    })
  }


  render() {
    return (
      <div className="App">
        My App
        <Dashboard bodys={this.state.bodys}/>
        {/* <Dashboard2 bodys={this.state.bodys}/> */}
      </div>
    );
  }
}

export default App;
