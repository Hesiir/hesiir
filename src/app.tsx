import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Relay from "react-relay";
import * as useRelay from "react-router-relay";
import {
  applyRouterMiddleware,
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import CreateRoutes from "./route";
import "./assets/css/style.css";

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(`//localhost:5000/graphql`, {
    credentials: 'include',
    headers: {
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjYW5hYW4iLCJleHAiOjE0ODAxNTkxNDIsInVubSI6Im9ybG8iLCJpYXQiOjE0ODAxNTg1NDJ9.O1ztgaP7Ku-tC-4KlXQjcd-aWbiKOiZGmiyWwPxytKQ",
      'X-Auth-Token': "71c4f04c-e610-4d19-8977-4fd840b20166",
      'Content-Type': 'application/graphql; charset=utf-16'
    }
  })
);
// console.log(applyRouterMiddleware(useRelay)())/
// fix a:active can't be work. 
document.body.addEventListener('touchstart', ()=>{})

let events = {
  _event: []
};
ReactDOM.render(
  <Router 
    environment={Relay.Store}
    render={applyRouterMiddleware([useRelay])}
    history={hashHistory} 
    children={CreateRoutes}
  />,
  document.getElementById('ReactContainer')
)