import store from 'store'
export default {
saveuser(user){
// localStorage.setItem('user-key',JSON.stringify(user))
store.set('user-key',user)
},
readuser(){
    // return  JSON.parse(localStorage.getItem('user-key')||'{}')
  return store.get('user-key')||'{}'
},
removeuser(){

    // localStorage.removeItem('user-key')
    store.remove('user-key')
}


}