/*
    诗歌主要内容页面
*/
import * as React from "react"
import { DeviceEventEmitter, Text, View ,StyleSheet,TouchableOpacity,ScrollView,TouchableNativeFeedback} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "./Home";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData } from "../func/throttle";
import { getFavoriteData } from "../func/throttle";
const Poetry = ({navigation,route}:any) => {
    // const data = route.params
    // 这个data 进来的时候就有
  const [data,setData] = React.useState(route.params);
  const [isFavorite,setIsFavorite] =React.useState<boolean>()

  React.useEffect(()=>{
    getData()
  },[])

  // 获取本地存储 与路由传来的值进行对比 看传来的值是否在本地存储已经存在 设置爱心
  // 这个功能就是更新爱心的状态
  const getData = async () => {
    getFavoriteData().then(res=>{
      if(res&&res.length){
        let flag:any =false
        res.findIndex((value,index,arr)=>{
          if(data.title==value.title){
            flag=true
          }
        })
        setIsFavorite(flag)
      }else{
        setIsFavorite(false)
      }
    })
  }
  const getHeart = () => {
    // 点击爱心 存储数据 已经存在删除 不存在就添加 爱心置负
    // setIsFavorite(!isFavorite)
    // storeData是async函数 在存储数据之后再更新爱心状态
    storeData(data).then(()=>{
      getData()
      // 调用事件
      DeviceEventEmitter.emit('page1',1)
    })
  }
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      getData()
    } catch(e) {
      // clear error
    }
    console.log('清除Done.')
  }
  return (
    <><ScrollView>
      <View>
        <View style={styles.mainText} >
          <TouchableOpacity onPress={() => navigation.navigate('Poetry')}>
            <View style={styles.mainHead}  >
              <Text style={styles.mainHeadText} >{data.title}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.mainTitle}>
            <Text style={styles.mainTitleText}>{data.author}</Text>
          </View>
          <View style={styleP.poertyContent}>
            <Text style={styles.mainContentText}>
            {data.content.map((item: any,index: any) => {
              return (item+"\n")
            })}
            </Text>
          </View>
          <View style={styles.mainFooter}>
            <Text style={styles.mainFooterText}> 
            <TouchableOpacity onPress={ getHeart}>
              <Icon name={isFavorite?"heart":"heart-o"} size={20} color="skyblue" />
            </TouchableOpacity>
              &nbsp;&nbsp; &nbsp;&nbsp;
            <TouchableOpacity onPress={()=>{getData()}}>
              <Icon name="plus-circle" size={20} color="skyblue" />
            </TouchableOpacity> 
              &nbsp;&nbsp; &nbsp;&nbsp;
            <TouchableOpacity onPress={()=>{clearAll()}}>
              <Icon name="share" size={20} color="skyblue" />
            </TouchableOpacity>
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="share-alt" size={20} color="skyblue" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="arrow-circle-o-right" size={20} color="skyblue" />
            </Text>
          </View>
        </View>
        
            <View style={styles.mainText}>
            <View style={styles.mainHead}>
                <Text style={styles.mainHeadText}>译文及注释</Text>
            </View>
            <View style={styleP.transHead}>
                <Text style={styleP.transHeadText}>译文</Text>
            </View>
            <Text style={styleP.transContnetText}>
            {data.translate?data.translate.map((item: any,index: any) => {
              return (item+"\n")
            }):'暂无'}
            </Text>
            <View style={styleP.br}></View>
            <View style={styleP.transHead}>
                <Text style={styleP.transHeadText}>注释</Text>
            </View>
            <Text style={styleP.transContnetText}>
                {data.annotation}
            </Text>
            <View style={styleP.br}></View>
            <TouchableNativeFeedback>
                <View style={styleP.tag}>
                    <Text style={styleP.tagButton}>有用</Text>
                    <Text style={styleP.tagButton}>没用</Text>
                </View>
            </TouchableNativeFeedback>
            <View style={styleP.border}></View>
            <Text>
                Tag:{data.tag?data.tag:'暂无'}
            </Text>
            </View>
            <View style={styles.mainText}>
            <View style={styles.mainHead}>
                <Text style={styles.mainHeadText}>赏析</Text>
            </View>
            <Text style={styleP.transContnetText}>
                {data.analyze?data.analyze:'暂无'}
            </Text>
            </View>
      </View></ScrollView>
    </>
  )
}
export var styleP = StyleSheet.create({
    transHead:{
        marginVertical:10
    },
    transHeadText:{
        fontWeight:'bold',
        color:'black',
        fontSize:20,
    },
    transContnetText:{
        fontWeight:'100',
        color:'black',
        lineHeight:30,
        fontSize:17
    },
    br:{
        height:20
    },
    border:{
        height:5,
        borderBottomColor:'rgb(238, 238, 238)',
        borderBottomWidth:1
    },
    tag:{
        display:'flex',
        flexDirection: 'row'
    },
    tagButton:{
        borderColor:'rgb(238, 238, 238)',
        marginRight:10,
        color:'gray',
        borderWidth:2,
        borderRadius:6,
        height:25,
        lineHeight:25,
        width:40,
        textAlign:'center'
    },
    poertyContent:{
      // maxHeight:180,
      // height:40,
      backgroundColor:'white',
      overflow:"hidden"
    },
})
export default Poetry