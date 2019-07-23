import  axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
// 如果服务器值接收urlended形式的参数的话，以下代码可以把Josn 形式改成urlender形式
axios.interceptors.request.use( function(config){
let {method,data} = config
if(method.toLowerCase()==='post' && typeof data==='object'){
        config.data= qs.stringify(data)
}
return config
})


axios.interceptors.response.use(function(response){
return response.data
},function(error){
message.error('请求出错'+error.message)
return new Promise(()=>{})
});
export default axios