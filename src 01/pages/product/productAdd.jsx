import React,{Component} from 'react'
import {
    Card,
  Icon,
  Form,
  Input,
  Select,
  Button,
  message
} from 'antd'
import LinkButton from '../../components/linkButton/LinkButton'
import {reqCategorys,reqAddUpdateProduct} from '../../api/index'
import memoryUtils from '../utils/memoryUtils'
import Pictures from './pictures-wall'
let Item=Form.Item
let Option=Select.Option
const { TextArea } = Input
class ProductAdd extends Component{
state={
    categorys:[]
    
}
   
    getCategory = async()=>{
        const result=await reqCategorys()
        if(result.status===0){
            const categorys = result.data
            this.setState({categorys})
        }
    }


    // 自定义验证商品价格输入不能为负数
    validatePrice=(rule, value, callback)=>{
        if(value===''){
            callback()
        }else if(value*1<=0){
            callback('商品价格必须大于0')
        }else{
            callback()
        }
    } 


    handleSubmit=(event)=>{
        event.preventDefault()
        // 对fome表单信息进行统一验证
        this.props.form.validateFields(async(err,values) =>{
            if(!err){
                // 拿到一下几个商品信息 发请求需要
                let {name, desc, price, categoryId} = values
                let result= await reqAddUpdateProduct()
            }
        })
    }


    componentWillMount(){
            this.product=memoryUtils.product
            this.isUpdate=!!this.product._id
    }
    componentDidMount(){
              this.getCategory()
    }

render(){
    const {product,isUpdate} =this
    const {categorys}=this.state
      const title=(
        <span>
            <LinkButton  onClick={()=>this.props.history.goBack()} >
                <Icon type='arrow-left'/>
            </LinkButton>
            <span>{isUpdate?'修改商品':'添加商品'}</span>
        </span>
    )
    let {getFieldDecorator}=this.props.form
    const formItemLayout = {
        labelCol: {span: 2} ,wrapperCol: {span: 8,},
      };
      
    return(
        <Card title={title}>
            <Form {...formItemLayout} onSubmit ={this.handleSubmit}>
                        <Item label="商品名称">
                            {getFieldDecorator('name', {
                                 initialValue:product.name,
                                rules: [{ required: true, message: '必须输入商品名称！' }],
                            })(<Input />)}
                         </Item>
                         <Item label="商品描述">
                                {getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    { required: true, message: '必须输入商品描述!' }
                                ],
                                })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
                            </Item>
                            <Item label="商品价格">
                            {getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, message: '必须输入价格' },
                                    { validator: this.validatePrice }
                            ],
                            })(<Input  type='number'  addonAfter="元"/>)}
                             </Item>
                            
                            <Item label="商品分类">
                            {getFieldDecorator('categoryId', {
                                initialValue: product.categoryId||'',
                                rules: [{ required: true, message: '必须输入商品分类!' }],
                            })(
                                <Select >
                                <Option value=''>未选择</Option>
                                  {  categorys.map(c=> <Option value={c._id} key={c._id}>{c.name}</Option>)
                                }
                                </Select>
                            )}
                            </Item>
                            <Item label="商品图片">
                                <Pictures />
                            </Item>
                            <Item >
                            <Button type="primary" htmlType="submit"> 提交</Button>
                            </Item>
                        </Form>
                    </Card>
                    )
                }
            }
 export default Form.create()(ProductAdd)