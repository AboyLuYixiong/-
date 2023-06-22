import React, { Component } from 'react'
import "./index.css"

export default class index extends Component {
  render() {
    return (
      <div className='footer'>
        <div className='footer-sponsors'>
          <a href='#!'>
            <img src={require('../../assets/images/sponsor1.png')} />
          </a>
          <a href='#!'>
            <img src={require('../../assets/images/sponsor2.png')} />
          </a>
          <a href='#!'>
            <img src={require('../../assets/images/sponsor3.png')} />
          </a>
        </div>
        <div className='footer-copyright'>
          <div className='copyright'>
            <a href='#!'>关于腾讯</a> |&nbsp;
            <a href='#!'>About Tencent</a> |&nbsp;
            <a href='#!'>服务协议</a> |&nbsp;
            <a href='#!'>隐私政策</a> |&nbsp;
            <a href='#!'>开放平台</a> |&nbsp;
            <a href='#!'>广告服务</a> |&nbsp;
            <a href='#!'>腾讯招聘</a> |&nbsp;
            <a href='#!'>腾讯公益</a> |&nbsp;
            <a href='#!'>客服中心</a> |&nbsp;
            <a href='#!'>举报中心</a> |&nbsp;
            <a href='#!'>网站导航</a> |&nbsp;
          </div>
          <div className='copyright'>
            Copyright © 1998 - 2023 Tencent. All Rights Reserved
          </div>
          <div>
            <a href='#!'>腾讯公司</a>
            <a href='#!'>版权所有</a>
          </div>
        </div>
      </div>
    )
  }
}
