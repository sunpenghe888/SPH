import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
const BASE=''
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})

export const reqWeather=(city)=>{
return new Promise((resolve,reject)=>{
let url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
             if(!error&&data.error===0){
                let {dayPictureUrl, weather}= data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
             }else{
                message.error('获取天气信息失败')
             }
        })
    })
}

export const reqCategorys = () => ajax(BASE + '/manage/category/list')

export const reqAddCategory = (categoryName) => ajax.post(BASE + '/manage/category/add',{categoryName})

export const reqUpdateCategory = ({categoryId, categoryName}) => ajax.post(BASE + '/manage/category/update',{categoryId, categoryName})

export const reqProducts=(pageNum,pageSize)=> ajax(BASE+'/manage/product/list',{
   params: 
  { pageNum, pageSize}
})


export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=> 
ajax(BASE+'/manage/product/search',
{
   params:{pageNum,pageSize,[searchType]:searchName,}
})

export const reqUpdateStatus=(productId, status)=> ajax(BASE+'/manage/product/updateStatus',
{
   method: 'POST',
   data: {
     productId,
     status
   }
})
export const reqCategory=(categoryId)=> ajax(BASE+'/manage/category/info',{
   params: 
  {categoryId}
})

// 添加/修改商品
export const reqAddUpdateProduct=(product)=> 
ajax.post(BASE+'/manage/product/'+(product._id? 'update':'add'),product)



