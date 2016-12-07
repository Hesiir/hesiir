import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  syncHistoryWithStore, 
  routerReducer
} from "react-router-redux";
import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux";
import {
  Provider
} from "react-redux";
import {
  applyRouterMiddleware,
  browserHistory,
  hashHistory,
  Router
} from "react-router";
import CreateRoutes from "./route";
import reducers from "./helper/reducers";
import thunk from "redux-thunk";
import "./assets/css/style.css";

// fix a:active can't be work. 
document.body.addEventListener('touchstart', ()=>{})

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunk)
); 
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history} children={CreateRoutes}/>
  </Provider>,
  document.getElementById('ReactContainer')
)  