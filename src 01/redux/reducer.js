import  storageUtils  from  '../pages/utils/storageUtils'
import {combineReducers}  from 'redux'
import  {
    HEARD_TITLE,
    USER
} from './actions-type'

// 管理标题状态的reducer函数
const initHeardtitle='首页'
function heardtitle (state=initHeardtitle,action){
    switch (action.type) {
        case HEARD_TITLE:
            return action.date
        default:
          return  state
    }
}

// // 管理用户状态的reducer函数
// const inituser=storageUtils.readuser
// function user (state=inituser,action){
//     switch (action.key) {
//         // case value:
            
//         //     break;
//         default:
//             break;
//     }
// }


export default combineReducers({
    heardtitle,
    // user
})