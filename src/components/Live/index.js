import React, { Component } from 'react'
import './index.css'
import axios from 'axios';

export default class index extends Component {

  constructor(props) {
    super(props)
    this.state = {
      livePageLeft: 0,
      // 当前城市的天气数据
      CityData: {},
      // 穿衣
      chuanyi: '',
      // 雨伞
      yusan: '',
      // 感冒
      ganmao: '',
      // 洗车
      xiche: '',
      // 运动
      yundong: '',
      // 防晒
      fangshai: '',
      // 钓鱼
      diaoyu: '',
      // 旅游
      lvyou: '',
      // 交通
      jiaotong: '',
      // 空气污染
      wuran: '',
      // 舒适度
      shushidu: '',
      // 晾晒
      liangshai: '',
    }
  }

  btnPrev = () => {
    this.setState({ livePageLeft: 0 })
  }

  btnNext = () => {
    this.setState({ livePageLeft: -440 })
  }

  // 请求当前天气数据
  componentDidMount() {
    axios.get('https://www.tianqiapi.com/life/lifepro?appid=79374549&appsecret=T0Ny9T3f')
      .then(res => {
        const data = res.data.data
        this.setState({
          CityData: data,
          chuanyi: data.chuanyi,
          yusan: data.yusan,
          ganmao: data.ganmao,
          xiche: data.xiche,
          yundong: data.yundong,
          fangshai: data.fangshai,
          diaoyu: data.diaoyu,
          lvyou: data.lvyou,
          jiaotong: data.jiaotong,
          wuran: data.wuran,
          shushidu: data.shushidu,
          liangshai: data.liangshai,
        })
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='live'>
        <div className='live-page-ctrl'>
          <a href='#!' className='btn button-prev' onClick={this.btnPrev}></a>
          <a href='#!' className='btn button-next' onClick={this.btnNext}></a>
        </div>
        <h2 className='live-title'>
          生活指数
        </h2>
        <div className='live-pages'>
          <div className='live-pages-content' style={{ marginLeft: this.state.livePageLeft + 'px' }}>
            <ul className='page' id='live-page1'>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-clothes'></i>
                  <p className='item-sub-text'>穿衣&nbsp;{this.state.chuanyi.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.chuanyi.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-umbrella'></i>
                  <p className='item-sub-text'>雨伞&nbsp;{this.state.yusan.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.yusan.desc}
                  </div>
                </div>
              </li>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-medicine'></i>
                  <p className='item-sub-text'>感冒&nbsp;{this.state.ganmao.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.ganmao.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-car'></i>
                  <p className='item-sub-text'>洗车&nbsp;{this.state.xiche.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.xiche.desc}
                  </div>
                </div>
              </li>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-sports'></i>
                  <p className='item-sub-text'>运动&nbsp;{this.state.yundong.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.yundong.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-sunscreen'></i>
                  <p className='item-sub-text'>防晒&nbsp;{this.state.fangshai.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.fangshai.desc}
                  </div>
                </div>
              </li>
            </ul>
            <ul className='page' id='live-page2'>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-fish'></i>
                  <p className='item-sub-text'>钓鱼&nbsp;{this.state.diaoyu.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.diaoyu.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-tour'></i>
                  <p className='item-sub-text'>旅游&nbsp;{this.state.lvyou.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.lvyou.desc}
                  </div>
                </div>
              </li>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-traffic'></i>
                  <p className='item-sub-text'>交通&nbsp;{this.state.jiaotong.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.jiaotong.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-air'></i>
                  <p className='item-sub-text'>空气污染扩散条件&nbsp;{this.state.wuran.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.wuran.desc}
                  </div>
                </div>
              </li>
              <li className='item odd'>
                <div className='item-sub'>
                  <i className='icon icon-comfort'></i>
                  <p className='item-sub-text'>舒适度&nbsp;{this.state.shushidu.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.shushidu.desc}
                  </div>
                </div>
              </li>
              <li className='item even'>
                <div className='item-sub'>
                  <i className='icon icon-field'></i>
                  <p className='item-sub-text'>晾晒&nbsp;{this.state.liangshai.level}</p>
                </div>
                <div className='item-detail'>
                  <div className='detail'>
                    {this.state.liangshai.desc}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
