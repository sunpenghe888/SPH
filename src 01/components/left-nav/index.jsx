
import React,{Component} from 'react'
import logo from '../../assets/imges/logo.png'
import menuList from '../../config/menuConfig'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './css/index.less'
import { title } from '../../redux/actions'
import {connect } from 'react-redux'
const { SubMenu } = Menu;

class Leftnav extends Component{

  // menuNode=(menuList)=>{
  //   return menuList.map((item)=>{
  //   if(!item.children){
  //     return (
  //       <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //           <Icon type={item.icon} />
  //           <span>{item.title}</span>
  //            </Link>
  //       </Menu.Item>
  //     )
  //   }else{
  //     return (
  //       <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.menuNode(item.children)}
  //         </SubMenu> 
  //     )
  //   }
  // })
  // }

  menuNode2=(menuList)=>{
    const path=this.props.location.pathname
    return menuList.reduce((pre,item)=>{
      if(!item.children){
        if(item.key===path||path.indexOf(item.key)===0){
          this.props.title(item.title)
        }
          pre.push((
            <Menu.Item key={item.key} onClick={()=>{this.props.title(item.title)}}>
              <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
              </Link>
            </Menu.Item> 
          ))
      }else{
        const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
        if(cItem){
         this.openKey=item.key
        }
       
        pre.push((
          <SubMenu
            key={item.key}
            title={
              <span>
              <Icon type={item.icon} />
              <span>{item.title}</span>
             </span> }
                  >
            {this.menuNode2(item.children)}
          </SubMenu> 
        ))
      }
      return pre
    },[])
  }

componentWillMount(){
  this.menuNode3 = this.menuNode2(menuList)
}

render(){
  let path2=this.props.location.pathname
  if (path2.indexOf('/product')===0) {
    path2 = '/product'
  }
    return(
        <div className='leftnav'>
            <Link className='left-Link'  to='/home'>
            <img src={logo} alt="logo"/>
            <h1>硅谷后台</h1>
            </Link>
        <Menu
          selectedKeys = {[path2]}
          defaultOpenKeys = {[this.openKey]}
          mode="inline"
          theme="dark"
        >
        {  this.menuNode3 }
        </Menu>
    </div>
    )
}
}

export default connect(
  state=>({

  }),
  {title}
)(withRouter(Leftnav)) 