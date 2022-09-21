  // 调用多次只会执行最后一次
  // 先开门，进人后关门，过一段时间再开
import AsyncStorage from "@react-native-async-storage/async-storage"
var timeout:any = true
const throttle = (fun:Function,wait=4000) =>{
  const fn = () => {
    if(timeout){
        fun()
        timeout=false
        setTimeout(() => {
            timeout=true
        }, wait);
        }
    }
  return fn()
}
const getFavoriteData = async () => {
  let oldValue
  try {
    oldValue = await AsyncStorage.getItem('@favorite_poetry')
    if(oldValue){
      oldValue=JSON.parse(oldValue)
      return oldValue
    }else{
      oldValue=null
      return oldValue
    }
  } catch(e) {
    // read error
  }
  return oldValue
}
const storeData = async (value) => {
  let addValue;
  let oldValue;
  let nowValue;
  addValue = value
  // console.log('addValue',addValue);
      try {
        oldValue = await AsyncStorage.getItem('@favorite_poetry')
        oldValue = JSON.parse(oldValue) 
        if(oldValue&&oldValue.length){
          if(oldValue.findIndex((val)=> val.title=== addValue.title) !== -1){
            let index = oldValue.findIndex((val)=> val.title=== addValue.title);
            oldValue.splice(index, 1);
            nowValue=oldValue
          }else {
            oldValue.push(addValue)
            nowValue=oldValue
          }
        }else{
          nowValue=[addValue]
        }
        nowValue = JSON.stringify(nowValue)
        await AsyncStorage.setItem('@favorite_poetry', nowValue)
        return nowValue
      } catch(e) {
        console.log(e);
    }

}
export {throttle,getFavoriteData,storeData}