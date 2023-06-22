import React, { Component } from 'react'
import './index.css'
import axios from 'axios'
export default class index extends Component {

  constructor() {
    super()
    this.state = {
      marginLeft: 0,
      // 当前城市的天气数据
      CityData: [],
    }
  }

  // -1400 -> -300     -300 -> 0
  btnPrev = () => {
    if (this.state.marginLeft == -1400) {
      this.setState({ marginLeft: this.state.marginLeft + 1100 })
    } else if (this.state.marginLeft == -300) {
      this.setState({ marginLeft: this.state.marginLeft + 300 })
    }
  }

  // 0 -> -1100     -1100 -> -1400
  btnNext = () => {
    if (this.state.marginLeft == 0) {
      this.setState({ marginLeft: this.state.marginLeft - 1100 })
    } else if (this.state.marginLeft == -1100) {
      this.setState({ marginLeft: this.state.marginLeft - 300 })
    }
  }

  componentDidMount() {
    axios.get('https://v0.yiketianqi.com/api/worldchina?appid=79374549&appsecret=T0Ny9T3f')
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
    return (
      <div className='hour'>
        <h2 className='hour-title'>
          逐小时预报
        </h2>
        <a className='hour-source' href='#!'>数据来源于中国天气网</a>
        <div className='hour-page-ctrl'>
          <a href='#!' className='btn button-prev' onClick={this.btnPrev}></a>
          <a href='#!' className='btn button-next' onClick={this.btnNext}></a>
        </div>
        <div className='hour-weather' style={{ marginLeft: this.state.marginLeft + 'px' }}>
          <ol className='hour-weather-table'>
            {
              this.state.CityData.hours?.map((item) => {
                return <li className='item'>
                  <p className='item-time'>{item.time}</p>
                  <img className='item-icon' src={require(`../../assets/images/${item.wea}.png`)} />
                  <p className='item-degree'>{item.tem}°</p>
                </li>
              })
            }
          </ol>
        </div>
      </div>
    )
  }
}
