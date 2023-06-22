import React, { Component } from 'react'
import axios from 'axios';
import './index.css'
import bgi_wind_east from '../../assets/images/wind-east.png'
import bgi_wind_west from '../../assets/images/wind-west.png'
import bgi_wind_north from '../../assets/images/wind-north.png'
import bgi_wind_south from '../../assets/images/wind-south.png'
import bgi_wind_northeast from '../../assets/images/wind-northeast.png'
import bgi_wind_northwest from '../../assets/images/wind-northwest.png'
import bgi_wind_southeast from '../../assets/images/wind-southeast.png'
import bgi_wind_southwest from '../../assets/images/wind-southwest.png'
import bgi_wind_no from '../../assets/images/wind-no.png'

export default class index extends Component {
  constructor() {
    super()
    this.state = {
      // 当前天气logo
      weatherLogo: "sun",
      // 天气列表
      weatherArr: ['晴', '雨', '雾', '云'],
      // 天气logo列表
      weatherLogoArr: ['fog', 'rain', 'sun', 'sunny'],
      // 当前城市的天气数据
      CityData: {},
      winNow: bgi_wind_east,
    }
  }

  // 请求当前天气数据
  componentDidMount() {
    axios.get('https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=79374549&appsecret=T0Ny9T3f')
      .then(res => {
        const data = res.data
        this.setState({
          CityData: data
        })
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    switch (this.state.CityData.wea) {
      case '多云':
        this.setState({ weatherLogo: 'sunny' });
        break;
      case '雾':
        this.setState({ weatherLogo: 'fog' });
        break;
      case '雨':
        this.setState({ weatherLogo: 'rain' });
        break;
      case '中雨':
        this.setState({ weatherLogo: 'mi-rain' });
        break;
      case '晴':
        this.setState({ weatherLogo: 'sun' });
        break;
    }

    switch (this.state.CityData.win) {
      case '东风':
        this.setState({ winNow: bgi_wind_east });
        break;
      case '西风':
        this.setState({ winNow: bgi_wind_west });
        break;
      case '北风':
        this.setState({ winNow: bgi_wind_north });
        break;
      case '南风':
        this.setState({ winNow: bgi_wind_south });
        break;
      case '东北风':
        this.setState({ winNow: bgi_wind_northeast });
        break;
      case '西北风':
        this.setState({ winNow: bgi_wind_northwest });
        break;
      case '东南风':
        this.setState({ winNow: bgi_wind_southeast });
        break;
      case '西南风':
        this.setState({ winNow: bgi_wind_southwest });
        break;
      case '无持续风向':
        this.setState({ winNow: bgi_wind_no });
        break;
    }

    return (
      <div className='weather'>
        <p className='weather-time'>中央气象台发布</p>
        <div className='weather-temp'>
          <p className='weather-temp-temp1'>{this.state.CityData.tem}°</p>
          <p className='weather-temp-temp2'>{this.state.CityData.wea}</p>
        </div>
        <div className='weather-other'>
          <p className='weather-other-item'>
            <i className='weather-other-item-logo1' style={{ backgroundImage: `url(${this.state.winNow})` }}></i>
            <span className='weather-other-item-wind'>{this.state.CityData.win}&nbsp;{this.state.CityData.win_speed}</span>
          </p>
          <p className='weather-other-item'>
            <i className='weather-other-item-logo2'></i>
            <span className='weather-other-item-humidity'>湿度&nbsp;{this.state.CityData.humidity}</span>
          </p>
          <p className='weather-other-item'>
            <i className='weather-other-item-logo3'></i>
            <span className='weather-other-item-kPa'>气压&nbsp;{this.state.CityData.pressure}hPa</span>
          </p>
        </div>
        <div className='weather-tips'>
          <p className='weather-tips-txt'>{this.state.CityData.air_tips}</p>
        </div>
        <div className='weather-logo'>
          <img className='weather-logo-img' src={require(`../../assets/images/${this.state.weatherLogo}.png`)} />
        </div>
      </div>
    )
  }
}
