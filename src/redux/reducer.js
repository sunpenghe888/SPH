import {INCREMENT,DECREMENT} from './action-type'

export default  function count(state=1,action){
    switch (action.type) {
        case INCREMENT:
            return state + action.number
            case DECREMENT:
                    return state-action.number
        default:
             return  state
    }
}

