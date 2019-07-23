import  {
    HEARD_TITLE,
    USER
} from './actions-type'
export  const title =(heardtitle) =>({type: HEARD_TITLE,date: heardtitle })
export  const user =(user) =>({type: USER,date: user })