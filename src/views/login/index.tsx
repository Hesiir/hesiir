import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import * as Relay from 'react-relay';
import { Link } from 'react-router';
import Scroller from 'Hesiir-components/lib/basic.Scroller';
const skeleton = require('../../assets/css/skeleton.styl');

interface LoginProps extends Props<Login>{
  viewer: {
    goodsList: any;
  }
};

class Login extends Component<LoginProps, {}>{
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
  }

  render(){
    return <div className={`${skeleton.root} root`}>
      <Scroller>
      </Scroller>
    </div>
  }
}

export default Relay.createContainer(Login, {
  fragments: {
    goodsTest: () => Relay.QL`
      fragments on Goods {
        goodsId
      }
    `
  }
})
