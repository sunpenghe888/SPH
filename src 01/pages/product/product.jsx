import React, { Component } from 'react'
import ProductHome from './productHome'
import ProductDetail from './productDetail'
import ProductAdd from './productAdd'
import {Redirect,Route,Switch} from 'react-router-dom'
/**
 * 商品管理
 */

export default class Product extends Component {

  render() {
   return(
     <Switch>
      <Route path='/product' exact  component={ProductHome}/>
      <Route path='/product/detail' component={ProductDetail}/>
      <Route path='/product/addupdate' component={ProductAdd}/>
      <Redirect to='/product'/>
    </Switch>
   )
  }
}
