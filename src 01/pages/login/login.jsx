import React from 'react'
import './css/login.less'
import logo from '../../assets/imges/logo.png'
import { Form, Icon, Input,Button,message} from 'antd';
import {reqLogin} from '../../api'
import {Redirect} from 'react-router-dom'
import  storageUtils  from '../utils/storageUtils'
import  memoryUtils from '../utils/memoryUtils.js'
class Login extends React.Component{
   
    handleSubmit = e => {
        e.preventDefault();

    // 统一校验字段
    this.props.form.validateFields(async (err,{username,password})=>{
        if(!err){
            let result= await reqLogin(username,password)
            if(result.status===0){
                let user = result.data
                storageUtils.saveuser(user)
                memoryUtils.user=user
                this.props.history.replace('/')
                message.success('登录成功了')
            }else{
                message.error(result.msg)
            }
        }else{
            alert('验证失败')
        }
    })
      }
    
    //   自定义密码校验
      validatorPwd=(rule,value,callback)=>{
        value = value.trim()
        if(!value){
            callback('输入的密码不能为空')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }else {
            callback()
        }
      }


render(){
       let user= memoryUtils.user
    if(user._id){
        return <Redirect to="/" />
    }
    const form = this.props.form
    const {getFieldDecorator}=form
    return(
           <div className='login'>
                <div className='loginheard'>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {/* 声明式验证: 使用插件已定义好的规则进行验证 */}
                         {
                    getFieldDecorator('username',{
                        initialValue: '',
                        rules:[
                            { required: true, whitespace: true, message: '用户名必须输入' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名最多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                          ] 
                    })(<Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="输入账号"/>
                        )}
                        </Form.Item>
                        <Form.Item>
                        {
                    getFieldDecorator('password',{
                        initialValue: '',
                        rules:[
                            {validator: this.validatorPwd}
                          ]
                    })(<Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password" placeholder="输入密码" />
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                    提交
                    </Button>
                        </Form.Item>
                    </Form>
                </div>
           </div> 
     )
    }
}

const WrapLogin=Form.create()(Login)
export default WrapLogin
