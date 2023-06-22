import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './index.css'

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // 当前城市的数据
      CityNow: {
        id: uuidv4(),
        city: '',
        isAttention: false,
        wea: '',
        temp: '',
      },
      // 关注的城市的列表
      CityAttentionArr: [
        {
          id: uuidv4(),
          city: '北京',
          isAttention: true,
          wea: '',
          temp: '',
        }
      ],
      // 关注城市显示
      CityActive: 'none',
      // 搜索框是否显示
      SearchActive: 'none',
      // 搜索框的内容
      SearchText: '',
      // 关注达到5个的提示
      MaxAttention: 'none',
      // 接口数据
      CityData: [],
    }
  }

  // 鼠标触碰城市
  CityEnter = () => {
    this.setState({ CityActive: 'block' })
  }

  // 鼠标离开城市
  CityLeave = () => {
    this.setState({ CityActive: 'none' })
  }

  // 点击搜索框
  SearchClick = () => {
    this.setState({ SearchActive: 'block' })
  }

  // 搜索框失去焦点
  SearchOut = () => {
    this.setState({ SearchActive: 'none' })
    this.setState({ SearchText: '' })
  }

  // 重置搜索框内容
  changeSearch = (e) => {
    this.setState({ SearchText: e.target.value })
  }

  // 添加关注
  addAttention = () => {
    // 如果关注列表还没满5个城市
    if (this.state.CityAttentionArr.length < 5) {
      // 如果还未被关注，则添加进关注列表
      if (!this.state.CityNow.isAttention) {
        let newCity = Object.assign({}, this.state.CityNow, { isAttention: true })
        this.state.CityAttentionArr.push(newCity)
        this.setState({ CityNow: newCity })
      }
    }
  }

  // 删除关注城市
  deleteCity = (id) => {
    // 获取原数组
    const { CityAttentionArr } = this.state
    // 从数组中删除该城市
    const newArr = CityAttentionArr.filter(city => {
      return city.id !== id
    })
    // 覆盖原数组
    this.setState({ CityAttentionArr: newArr })
    // 如果删除的是当前城市，则修改为“添加关注”
    if (id == this.state.CityNow.id) {
      let newCity = Object.assign({}, this.state.CityNow, { isAttention: false })
      this.setState({ CityNow: newCity })
    }
  }

  // 从关注列表中切换城市
  changeCity = (id) => {
    const newCity = this.state.CityAttentionArr.filter(item => {
      return item.id == id
    })
    this.setState({ CityNow: newCity[0] })
  }

  // 点击添加关注提示文字 -> 在还未关注的情况下 -> 满5个城市显示提示
  showReminder = () => {
    if (this.state.CityAttentionArr.length >= 5) {
      if (!this.state.CityNow.isAttention) {
        this.setState({ MaxAttention: 'block' })
      }
    }
  }

  // 在添加关注满5个的提示显示出来后 -> 鼠标移开隐藏显示
  hideReminder = () => {
    this.setState({ MaxAttention: 'none' })
  }

  componentDidMount() {
    // 请求当前定位的天气数据
    axios.get('https://v0.yiketianqi.com/api?unescape=1&version=v61&appid=79374549&appsecret=T0Ny9T3f')
      .then(res => {
        const data = res.data
        this.setState({
          CityData: data,
        })
        let nowCity = Object.assign({}, this.state.CityNow, { city: data.city })
        this.setState({ CityNow: nowCity })
      }).catch(err => {
        console.log(err);
      });

    // 请求当前选中城市的天气数据
    axios.get(`https://v0.yiketianqi.com/api?city=${this.state.CityNow.city}&version=v61&appid=79374549&appsecret=T0Ny9T3f`)
      .then(res => {
        const data = res.data
        let nowCity = Object.assign({}, this.state.CityNow, { wea: data.wea_day + '转' + data.wea_night, temp: data.tem2 + '°/' + data.tem1 + '°' })
        this.setState({ CityNow: nowCity })
      }).catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className='header'>
        <div className='header-content'>
          {/* logo */}
          <img className='header-logo' src={require("../../assets/images/logo.png")} />
          <div className='header-location'>
            <div className='city' onMouseEnter={this.CityEnter} onMouseLeave={this.CityLeave} >
              <p className='city-now' >{this.state.CityNow.city}</p>
              {/* 关注城市 */}
              <div className='city-attention' style={{
                display: this.state.CityActive
              }}>
                <h3 className='city-attention-title'>关注的城市</h3>
                <ol className='city-attention-table'>
                  {
                    // this.state.CityAttentionArr != [] ?
                    this.state.CityAttentionArr.map((item) => {
                      return <li className='city-attention-item' key={item.id} >
                        <div className='city-attention-item-city' onClick={() => this.changeCity(item.id)}>{item.city}</div>
                        <p className='city-attention-item-wea'>{item.wea}</p>
                        <p className='city-attention-item-temp'>{item.temp}</p>
                        <a href='#!' className='button-delete' onClick={() => this.deleteCity(item.id)}></a>
                      </li>
                    })
                    // : <div className='city-attention-tips'>点击“添加关注”添加城市哟~</div>
                  }
                </ol>
              </div>
            </div>
            <a href='#!' className='button-attention' onMouseLeave={this.hideReminder} onClick={() => { this.showReminder(); this.addAttention() }}>[{this.state.CityNow.isAttention ? '已关注' : '添加关注'}]</a>
            {/* 关注满的提示 */}
            <p className='max-attention' style={{
              display: this.state.MaxAttention
            }}>最多只能添加5个城市</p>
            <div className='city-search'>
              {/* 搜索框 */}
              <input className='city-search-box' placeholder="搜索市、区、县等" value={this.state.SearchText} onChange={this.changeSearch} onBlur={this.SearchOut} onClick={this.SearchClick} />
              {/* 热门城市 */}
              <div className='city-hot' style={{
                display: this.state.SearchActive
              }}>
                <p className='city-hot-nowCity-title'>当前城市</p>
                <p className='city-hot-nowCity-city'>{this.state.CityNow.city}</p>
                <p className='city-hot-hotCity-title'>热门城市</p>
                <ul className='city-hot-hotCity-cityTable'>
                  <li className='city-hot-hotCity-city' onClick={this.cutCity}><span>北京</span></li>
                  <li className='city-hot-hotCity-city'><span>上海</span></li>
                  <li className='city-hot-hotCity-city'><span>广州</span></li>
                  <li className='city-hot-hotCity-city'><span>深圳</span></li>
                  <li className='city-hot-hotCity-city'><span>天津</span></li>
                  <li className='city-hot-hotCity-city'><span>西安</span></li>
                  <li className='city-hot-hotCity-city'><span>武汉</span></li>
                  <li className='city-hot-hotCity-city'><span>成都</span></li>
                  <li className='city-hot-hotCity-city'><span>郑州</span></li>
                  <li className='city-hot-hotCity-city'><span>贵州</span></li>
                  <li className='city-hot-hotCity-city'><span>苏州</span></li>
                  <li className='city-hot-hotCity-city'><span>太原</span></li>
                  <li className='city-hot-hotCity-city'><span>厦门</span></li>
                  <li className='city-hot-hotCity-city'><span>青岛</span></li>
                  <li className='city-hot-hotCity-city'><span>济南</span></li>
                  <li className='city-hot-hotCity-city'><span>福州</span></li>
                  <li className='city-hot-hotCity-city'><span>合肥</span></li>
                  <li className='city-hot-hotCity-city'><span>扬州</span></li>
                  <li className='city-hot-hotCity-city'><span>唐山</span></li>
                  <li className='city-hot-hotCity-city'><span>杭州</span></li>
                  <li className='city-hot-hotCity-city'><span>南昌</span></li>
                  <li className='city-hot-hotCity-city'><span>重庆</span></li>
                  <li className='city-hot-hotCity-city'><span>昆明</span></li>
                  <li className='city-hot-hotCity-city'><span>邯郸</span></li>
                  <li className='city-hot-hotCity-city'><span>沈阳</span></li>
                  <li className='city-hot-hotCity-city'><span>邢台</span></li>
                  <li className='city-hot-hotCity-city'><span>长春</span></li>
                  <li className='city-hot-hotCity-city'><span>东莞</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}



