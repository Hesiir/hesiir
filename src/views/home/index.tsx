import * as React from 'react';
import {
  Component,
  Props
} from 'react';
import * as Relay from 'react-relay';
import { Link } from 'react-router';
import Scroller from 'hesiir-components/lib/basic.Scroller';
import ListGrid from '../../component/ListGrid';
import ShowCard from '../../component/ShowCard';
import NavigatorBar from '../../component/NavigatorBar';
import * as cn from 'classnames';
const skeleton = require('../../assets/css/skeleton.styl');

interface MallProps extends Props<Mall>{
  viewer: {
    goodsList: any;
  }
};

class Mall extends Component<MallProps, {}>{
  componentWillMount(){
    document.body.style.backgroundColor = skeleton.sipcBgColor;
  }

  render(){
    const goods_data = [
      {
        title: '我也不知道发生了神',
        brief: '我也不知道发生了神我也不知道发生了神',
        picture: 'https://s.gravatar.com/avatar/a6227e5f03b0783861ed9665c7aa1a3c?s=400',
        feature: 'sun',
        price: 438
      },
      {
        title: '我也不知道发生了神',
        brief: '我也不知道发生了神我也不知道发生了神',
        picture: 'https://s.gravatar.com/avatar/a6227e5f03b0783861ed9665c7aa1a3c?s=400',
        feature: 'sun',
        price: 438
      },
      {
        title: '我也不知道发生了神',
        brief: '我也不知道发生了神我也不知道发生了神',
        picture: 'https://s.gravatar.com/avatar/a6227e5f03b0783861ed9665c7aa1a3c?s=400',
        feature: 'sun',
        price: 438
      },
      {
        title: '我也不知道发生了神',
        brief: '我也不知道发生了神我也不知道发生了神',
        picture: 'https://s.gravatar.com/avatar/a6227e5f03b0783861ed9665c7aa1a3c?s=400',
        feature: 'sun',
        price: 438
      }
    ];

    const navs = [
      {
        key: null,
        value: 3490
      },
      {
        key: null,
        value: 3490
      },
      {
        key: null,
        value: 3490
      },
      {
        key: null,
        value: 3490
      }
    ];
    return <div className={`${skeleton.rootDom} rootDom`}>
      <Scroller>
        <div className={`${skeleton.head}`}>
          <img src={require('../../assets/img/store_banner.png')} alt=""/>
        </div>
        <ListGrid className={skeleton.listGrid} linkText={'example text'} listInfo={[
          {key: 'text', value: 349},
          {key: 'text', value: 349}
        ]}/>
        {goods_data.map((goods, index) => <ShowCard className={skeleton.showCard} goods={goods} reverse={index%2?true:false}/>)}
      </Scroller>
      <NavigatorBar listInfo={navs}></NavigatorBar>
    </div>
  }
}

export default Relay.createContainer(Mall, {
  fragments: {
    goodsTest: () => Relay.QL`
      fragments on Goods {
        goodsId
      }
    `
  }
})
