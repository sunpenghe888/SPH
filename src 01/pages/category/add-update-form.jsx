import React from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'
const Item=Form.Item

class AddUpdateForm extends React.Component{

    static propTypes ={
        setForm:PropTypes.func.isRequired,
        categoryName:PropTypes.string
    }


 componentWillMount () {
    this.props.setForm(this.props.form)
    }


render(){
    let {getFieldDecorator} =this.props.form
    let {categoryName}=this.props
    return(
        <Form>
            <Item>
            { getFieldDecorator('categoryName',{
                initialValue:categoryName||'',
                rules:[{required: true, message: '分类名称必须输入'}]
                }
            )(<Input placeholder="请输入分类名称" ></Input>)}
            </Item>
        </Form>
        )
    }
}

export default Form.create()(AddUpdateForm)