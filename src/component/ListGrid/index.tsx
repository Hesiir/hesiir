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

interface ListGridProps extends Props<ListGrid>{
  className?: string,
  linkText?: string,
  listInfo?: StrNumType[]
}

export default class ListGrid extends Component<ListGridProps, any>{

  public static defaultProps: ListGridProps = {
    className: null,
    linkText: null,
    listInfo: []
  };

  renderListInfo = () => this.props.listInfo.map(list => <div
    className={cx('list', 'List')}
  >
    <p>{list.key}</p>
    <p>{list.value}</p>
  </div>);

  render(){
    return <section className={cx('listGrid', this.props.className, 'ListGrid')}>
      <div className={cx('inner', 'Inner')}>{this.renderListInfo()}</div>
      <footer>
        <Link to={''} className={cx('link', 'Link')}>{this.props.linkText}</Link>
      </footer>
    </section>
  }
}
