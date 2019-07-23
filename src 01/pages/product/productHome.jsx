import React ,{Component} from 'react'
import {
    Card,
    Select,
    Button ,
    Input ,
    Icon,
    Table,
    message
        } from 'antd'
import LinkButton from '../../components/linkButton/LinkButton'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import { PAGE_SIZE } from '../utils/Constants'
import memoryUtils from '../utils/memoryUtils'
const Option = Select.Option

export default class ProductHome extends Component{
    state={
        loading:false,
        products:[],
        total:0,
        searchType:'productName',
        searchName:''
      }
      updateStatus= async (productId,status)=>{
        console.log(status)
        status= status=== 1 ? 2 : 1
        
        const result= await reqUpdateStatus(productId,status)
        if(result.status === 0){
         message.success('更新商品状态成功') 
         this.getProducts(this.pageNum)
        }
      }
      initColumns=()=>{
         this.columns = [
          {
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '商品描述',
            dataIndex: 'desc',
          },
          {
            title: '价格',
            width:100,
            dataIndex: 'price',
            render: (price) => '￥'+price
          },
          {
            title: '状态',
            width:100,
            render: ({_id,status}) =>{
              let btnText='下架'
              let text='在售'
              if(status===2){
                btnText='上架'
               text='已下架'
              }
              return(
                  <span>
                      <button onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</button><br />
                      <span>{text}</span>
                  </span>
              )
            }
          },
          {
            title: '操作',
            width:100,
            render: (product) => (
              <span>
                <LinkButton 
                onClick={() => { 
                  memoryUtils.product=product
                  this.props.history.push('/product/detail') }}
                >详情</LinkButton>
                <LinkButton  
                onClick={() => { 
                  memoryUtils.product=product
                  this.props.history.push('/product/addupdate') }}
                >修改</LinkButton>
              </span>
            )
          },
        ];
      }

     

      getProducts = async (pageNum)=>{
        this.pageNum=pageNum
        const {searchName,searchType}=this.state
        let result
        if(!searchName){
          result = await reqProducts(pageNum, PAGE_SIZE)
         
        }else {
          result = await reqSearchProducts({pageNum,pageSize: PAGE_SIZE ,searchName,searchType})
        }
        if(result.status===0){
          const { total, list } = result.data
          this.setState({
            total,
            products:list
          })
        }
      }

     
    componentWillMount(){
    this.initColumns()
    }
    
    componentDidMount(){
    this.getProducts(1)
    }
    render(){

        let {loading,products,total,searchType,searchName}=this.state
        let title=(
            <span>
                <Select  value={searchType}
                 style={{width:300}}
                 onChange={value=>this.setState({searchType:value})}
                 >
                  <Option value="productName">按名称搜索</Option>
                  <Option value="productDesc">按描述搜索</Option>
                </Select>
                  <Input style={{ width: 200, margin: '0 10px' }} placeholder="关键字"
                  value={searchName}
                  onChange={event=>this.setState({searchName:event.target.value})}
                  />
                  <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        let extra=(
          <Button type="primary" onClick={() => {
            memoryUtils.product={}
            this.props.history.push('/product/addupdate')
          }} >
          <Icon type="plus" />
          添加商品
          </Button>
        )
  
      return (
       <Card  title={title}  extra={extra}>
          <Table
          columns={this.columns}
          dataSource={products}
          loading={loading}
          bordered={true}
          rowKey="_id"
          pagination={{ 
            defaultPageSize:PAGE_SIZE,
            showQuickJumper:true, 
            total , 
            onChange: this.getProducts,
            current:this.pageNum
          }}
        />
       </Card>
      )
    }
}