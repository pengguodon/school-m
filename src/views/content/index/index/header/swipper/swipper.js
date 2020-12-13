import React from 'react'
import './swipper.css'

//引入此路径，才不会打包失败
import Swiper from 'swiper/js/swiper.js';
//引入样式，还可以加上自己的样式
import 'swiper/css/swiper.min.css';

import mySlideshow from 'api/slideshow/slideshow'

class IndexSwiper extends React.Component {

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  init(){
    this.swiperInit()
    mySlideshow.slideshowList().then(res=>{
     this.setState({
       data: [...res.data.items]
     })
     if(this.state.mySwiper.init){ // 初始化
      this.state.mySwiper.init()
     }
    })
  }

  state = {
    data: [],
    mySwiper: {}
  }

  swiperInit(){
    this.setState({
      mySwiper: new Swiper('#swiper-container', {
        autoplay: {
          disableOnInteraction: false,
          delay: 2500,
        },
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        },
        init: false,
      })
    })
  }

  render() {
    return (
      <div className='index_swiper'>
        <div className="swiper-container" id="swiper-container">
          <div className="swiper-wrapper">
            {
              this.state.data.map(v=>{
                return (
                  <div className="swiper-slide" style={{backgroundColor: "#eee"}}  key={v.ssid}>
                    <img src={v.sssrc} alt={v.ssname}/>
                      <div className="title">{v.ssname}</div>
                  </div>
                )
              })
            }
          </div>
          <div className='swiper-pagination'></div>
        </div>
      </div>
    )
  }
}

export default IndexSwiper