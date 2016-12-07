import * as React from 'react';
import * as Relay from "react-relay";
import Mall from '../views/home';
import { 
  Error,
  Loading
 } from 'Hesiir-components/lib/basic.StatePage';
import {
  GoodsTestQuery
} from "./qm";


const Unexpected = (Component) => 
({done, error, props, retry, stale}) => {
  if (error) {
    return <Error />;
  } else if (props) {
    return <Component {...props} />;
  } else {
    return <Loading />;
  }
}

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */
let CreateRoutes = [];

export const MallRoutes = {
  path: '/',
  component: Mall,
  queries: GoodsTestQuery,
  render: Unexpected(Mall)
}
CreateRoutes.push(MallRoutes)

// export const DetailRoutes = {
//   path: '/detail/:goodsid',
//   getComponent (nextState, cb) {
//     require.ensure([], (require) => {
//       const Detail = require('../views/detail').default
//       cb(null, Detail)
//     }, 'Detail')
//   },
//   queries: GoodsTestQuery,
// }
// CreateRoutes.push(DetailRoutes)

// export const OrderRoutes = {
//   path: '/order/:goodsid',
//   getComponent (nextState, cb) {
//     require.ensure([], (require) => {
//       const Order = require('../views/order').default
//       cb(null, Order)
//     }, 'Order')
//   },
//   queries: GoodsTestQuery,
// }
// CreateRoutes.push(OrderRoutes)

// export const AddressRoutes = {
//   path: '/address/:orderId',
//   getComponent (nextState, cb) {
//     require.ensure([], (require) => {
//       const Address = require('../views/Address').default
//       cb(null, Address)
//     }, 'Address')
//   },
//   queries: GoodsTestQuery,
// }
// CreateRoutes.push(AddressRoutes)

export default CreateRoutes