import React, { Component } from 'react'
import LinkButton from '../../components/linkButton/LinkButton'
import {Card, 
  Button, 
  Icon, 
  Table,
  message,
  Modal} from 'antd'

import { reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api' 
import AddUpdateForm from './add-update-form'


/**
 * 分类管理
 */
export default class Category extends Component {
  state={ 
    categorys: [], // 所有分类的数组
    loading: false, // 是否正在请求加载中
    showStatus: 0, // 0: 不显示, 1: 显示添加, 2: 显示修改
  }



  initcolumns = ()=>{
    this.columns=[{
        title: '分类的名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
       render: (category)=><LinkButton onClick={()=>{
        this.category=category
        this.setState({showStatus:2})
       }}>修改分类</LinkButton>
      }
    ]
  }
  getCategorys= async()=>{
    this.setState({loading:true})
    let result=await reqCategorys()
    this.setState({loading:false})
    if(result.status===0){
      const categorys = result.data
      this.setState({categorys })
    }else {
      message.error('获取分类列表失败')
    }
  }

  componentWillMount(){
    this.initcolumns()
  }
  componentDidMount(){
    this.getCategorys()
}

handleOk=()=>{
this.form.validateFields(async (err,value)=>{
  if(!err){
    let  {categoryName} =value
    let {showStatus}=this.state
    let result
    if(showStatus===1){
          result = await reqAddCategory(categoryName)
    }else{
      let categoryId=this.category._id
          result =  await reqUpdateCategory({categoryId, categoryName})
    }
    this.form.resetFields()
    this.setState({ showStatus: 0 })
    let action = showStatus===1?'添加':'修改'
    if(result.status===0){
      this.getCategorys(result)
      message.success( `分类${action}成功`)
    }else{
      message.error(`分类${action}失败`)
    }
  }
})
}  
handleCancel=()=>{
this.setState({showStatus:0})
}
  render() {

    let {categorys,loading,showStatus}=this.state
    let category= this.category||{}
    let extra=(
      <Button type='primary' onClick={()=>{
        this.category=null
        this.setState({showStatus:1})}}>
        <Icon type='plus' /> 
        添加
      </Button>
    )
    return (
      <Card  extra={extra}>
      <Table
        columns={this.columns}
        dataSource={categorys}
        bordered
        pagination={{ defaultPageSize:6 ,showQuickJumper:true}}
        rowKey='_id'
        loading={loading}
      />
      <Modal
          title={showStatus === 1 ? "添加分类" : "修改分类"}
          visible={showStatus!==0}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >


        <AddUpdateForm setForm={form=>this.form=form}  categoryName={category.name}/>

        </Modal>
       </Card>
    )
  }
}
