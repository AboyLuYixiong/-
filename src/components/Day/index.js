import React, { Component } from 'react'
import axios from 'axios'
import * as echarts from 'echarts'
import './index.css'
export default class index extends Component {
  constructor() {
    super()
    this.state = {
      // 一周的天气数据
      CityData: [],
      //温差
      tempMax: [],
      tempMin: [],
    }
  }

  componentDidMount() {
    axios.get('https://wis.qq.com/city/like?source=pc&city=深圳')
      .then(res => {
        const data = res
        this.setState({
          CityData: data,
        })
        for (var i = 0; i < data.length; i++) {
          this.state.tempMax.push(data[i].tem1)
          this.state.tempMin.push(data[i].tem2)
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echarts'));
        // 绘制图表
        myChart.setOption({
          grid: {
            height: 600,
            x: 115,
            y: -40,
            x2: 120,
            y2: 30,
          },
          xAxis: {
            type: 'category',
            show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
          },
          yAxis: [{
            type: 'value',
            show: false, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
            splitNumber: 1,
            minInterval: 1
          }],
          series: [
            {
              data: this.state.tempMax,
              type: 'line',
              symbol: 'circle',
              symbolSize: [8, 8],
              itemStyle: {
                color: 'rgb(252,195,112)'
              },
              label: {
                show: true,
                position: 'top',
                formatter: function (data) {
                  return data.value + '°';
                }
              },
            },
            {
              data: this.state.tempMin,
              type: 'line',
              symbol: 'circle',
              symbolSize: [8, 8],
              itemStyle: {
                color: 'rgb(148,204,249)'
              },
              label: {
                show: true,
                position: 'bottom',
                formatter: function (data) {
                  return data.value + '°';
                }
              },
            }
          ]
        });
      }).catch(err => {
        console.log(err);
      });
  }

  weatherLogo() {
    switch (this.state.CityData.wea_day) {
      case '多云':
        this.setState({ weatherLogo: 'sunny' });
        break;
      case '雾':
        this.setState({ weatherLogo: 'fog' });
        break;
      case '雨':
        this.setState({ weatherLogo: 'rain' });
        break;
      case '晴':
        this.setState({ weatherLogo: 'sun' });
        break;
      case '霾':
        this.setState({ weatherLogo: 'haze' });
        break;
    }
  }

  render() {
    return (
      <div className='day'>
        <h2 className='day-title'>7日天气预报</h2>
        <div className='day-weather'>
          <ol className='day-weather-table'>
            {
              this.state.CityData?.map((item) => {
                return <li className='item'>
                  <p className='item-day'>{item.week}</p>
                  <p className='item-date'>{item.date}</p>
                  <div className='item-daytime'>
                    <p className='item-weather'>{item.wea_day}</p>
                    <img className='item-icon' src={require(`../../assets/images/${item.wea_day}.png`)} />
                  </div>
                  <div className='item-night'>
                    <img className='item-icon' src={require(`../../assets/images/${item.wea_night}.png`)} />
                    <p className='item-weather'>{item.wea_night}</p>
                  </div>
                </li>
              })
            }
          </ol>
          <div className='day-weather-charts'>
            <div id='echarts' style={{ width: '740px', height: '600px' }}></div>
          </div>
        </div>
      </div>
    )
  }
}
