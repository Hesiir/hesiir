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
import { StrNumType } from '../../types';
import { Link } from 'react-router';
import * as cn from 'classnames/bind';

const cx = cn.bind(require('./style.styl'));

interface NavigatorBarProps extends Props<NavigatorBar>{
  className?: string,
  listInfo?: StrNumType[]
}

export default class NavigatorBar extends Component<NavigatorBarProps, any>{

  public static defaultProps: NavigatorBarProps = {
    className: null,
    listInfo: []
  };

  renderListInfo = () => this.props.listInfo.map(list => <div
    className={cx('list', 'NavBarList')}
  >
    {list.key && <p>{list.key}</p>}
    {list.value && <p>{list.value}</p>}
  </div>);

  render(){
    return <section className={cx('navigatorBar', this.props.className, 'NavigatorBar')}>
      {this.renderListInfo()}
    </section>
  }
}
