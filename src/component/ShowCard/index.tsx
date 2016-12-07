///////////////////////////////////////////////////////////////////////////////////
//  Copyright 2016-present, Jnfinity, Inc.                                       //
//  All rights reserved.                                                         //
//                                                                               //
//  This source code is licensed under the BSD-style license found in the        //
//  LICENSE file in the root directory of this source tree. An additional grant  //
//  of patent rights can be found in the PATENTS file in the same directory.     //
//                                                                               //
//  @Author Orlo Wang                                                            //
//  @Email  ow.cc@outlook.com                                                    //
//  @providesComponent ShowCard                                                  //
///////////////////////////////////////////////////////////////////////////////////

import * as React from 'react';
import {
  Component,
  Props,
  PropTypes
} from 'react';
import {
  GoodsType
} from './types';
import * as cn from 'classnames/bind';
import UnitFormatted from 'hesiir-components/lib/basic.UnitFormatted';
import { currency } from '../../helper/standard';

const cx = cn.bind(require('./style.styl'));

interface ShowCardStatus {}
interface ShowCardProps extends Props<ShowCard>{
  goods?: GoodsType,
  reverse?: boolean,
  className?: string
}

export default class ShowCard extends Component<ShowCardProps,ShowCardStatus>{
  constructor(props){
    super(props);
    this.state = {}
  }

  public static defaultProps: ShowCardProps = {
    className: null,
    goods: {
      picture: null,
      title: null,
      brief: null,
      price: null,
      feature: null
    }
  };

  componentDidMount(){

  }

  render(){
    return <section className={cx('showCard', this.props.className, 'ShowCard')}>
      <article style={{order: this.props.reverse ? 2 : 0}}><img src={this.props.goods.picture}/></article>
      <article style={{order: 1}}>
        <p>{this.props.goods.title}</p>
        <p>{this.props.goods.brief}</p>
        <UnitFormatted unitType='rmb'>{this.props.goods.price}</UnitFormatted>
      </article>
    </section>
  }
}
