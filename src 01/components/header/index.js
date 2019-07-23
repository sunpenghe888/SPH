import React,{Component} from 'react'
import './index.less'
import memoryUtils from '../../pages/utils/memoryUtils'
import storageUtils  from '../../pages/utils/storageUtils'
import { Modal} from 'antd';
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {formateDate} from '../../pages/utils/dateUtils'
import {reqWeather} from '../../api' 
import LinkButton from '../linkButton/LinkButton'

 
class Header extends  Component{
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: '', 
      }



logout=()=>{
    Modal.confirm({
        title: '确定退出吗？',
        onOk:()=> {
          console.log('确定')
          storageUtils.removeuser()
        memoryUtils.user={}
        this.props.history.replace('/login')
        },
        onCancel() {
          console.log('取消');
        }
      })
}
gettitle=()=>{
let title=''
let path=this.props.location.pathname
 menuList.forEach((item)=>{
    if(item.key===path){
        title=item.title
    }else if(item.children){
        const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
        if(cItem){
            title=cItem.title
        }
    }
 })
return title
}

componentDidMount(){
    this.time=setInterval(() => {
        this.setState({
            currentTime: formateDate(Date.now())
        })
    }, 1000);
    this.getweather()
}

componentWillUnmount () {
    // 清除定时器
    clearInterval(this.time)
  }

getweather= async ()=>{
    let {dayPictureUrl, weather}= await reqWeather('北京')
    this.setState({
        dayPictureUrl,
         weather
    })
}


render(){
    let user=memoryUtils.user
    const title = this.gettitle()
    let {currentTime, dayPictureUrl,weather}=this.state
    return(
        <div className='header'>
             <div className='header-top'>
               欢迎{user.username} &nbsp;&nbsp;
               <LinkButton onClick={this.logout}>回退</LinkButton> 
            </div>  
             <div className='header-bottom'>
                 <div className='header-bottom-left'>{title}</div>
                 <div className='header-bottom-right'>
                    <span className='currentTime'>{currentTime}</span>
                    <img src={dayPictureUrl} alt="weather"/>
                    <span>{weather}</span>
                 </div>
             </div>  
         </div>
        )
    }
}

export default withRouter(Header)