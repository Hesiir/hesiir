import * as Relay from "react-relay";

export const GoodsTestQuery = {
  goodsTest: () => Relay.QL`
    query {
      goodsTest
    }`
};

// get viewer by component
// export default {
//   viewer: (component) => Relay.QL`
//     query {
//       viewer {
//         ${component.getFragment('viewer')}
//       }
//     }`
// };