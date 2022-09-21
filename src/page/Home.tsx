import * as React from "react"
import { StyleSheet, Text, TextInput, View,ScrollView, Button,RefreshControl,  ActivityIndicator, Image,} from "react-native"
import { TouchableHighlight,TouchableOpacity,DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFavoriteData,storeData,throttle } from "../func/throttle";
import axios from 'axios'
interface a{
  title:string,
  author:string,
  dynasty:string,
  content:string[],
  translate:string[],
  annotation:string,
  tag:string,
  analyze:string,
  oneContent:string,
  id:any,
  popularity:number,
}
const initObj = {
    title:'杨柳枝词',
    author:'白居易',
    dynasty:'唐代',
    oneContent:"一树春风千万枝，嫩于金色软于丝.",
    content:["一树春风千万枝，嫩于金色软于丝。永丰西角荒原里，今日无人属阿谁？"],
    translate:["春风吹拂，千丝万缕的柳枝随风起舞，枝头嫩芽一片鹅黄，飘荡的柳枝比丝缕还要柔软。永丰坊西角的荒园里，没有一人光顾，这美好的柳枝又能属于谁呢？"],
    annotation:"千万枝：一作“万万枝”。永丰：永丰坊，唐代东都洛阳坊名。阿（ā）谁：疑问代词。犹言谁，何人。",
    tag:"吉林大学中文系。唐诗鉴赏大典(十)。",
    analyze:"这是一首写景寓意诗，前两句写景，极写柳树的美态，诗人所抓的着眼点是柳条，写出了动态、形态和色泽显出它的材质之美。后两句写的是诗人对柳树遭遇及自己的评价，因为柳树所生之地不得其位，而不能得到人的欣赏，寓意怀才不遇而鸣不平，含蓄地抨击了当时的人才选拔机制和相关政府官员。",
    id:1,
    popularity:111,
}

let initPoetry:a[] = []

const Home = ({navigation,route}:any) => {
  // 刷新依赖
  const [refreshing, setRefreshing] = React.useState(false);
  // 当前页面显示的内容
  const [poetry,setPoetry] = React.useState(initPoetry)
  // 收藏
  const [favorite,setFavorite] = React.useState([]);
  const [state,setState] = React.useState(0)
  const [url,setUrl] = React.useState('https://cdn.seovx.com/ha/img/mom-ha-20-2%20('+Math.floor(Math.random()*80)+').jpg')
  const IMG = React.useMemo(()=>(<Image
                                    style={styles.tinyLogo}
                                    source={{
                                    uri: url,
                                  }}
                                />),[url])
  React.useEffect(()=>{
    const listen = DeviceEventEmitter.addListener('page1',params =>{
      homeGetHeart(poetry)
    })
  },[])                          
  React.useEffect(()=>{
    getPoetry()
  },[])
  /*
    初始化内容。
    解释一下,在initGetPoetry方法里面使用setPoetry([...initPoetry,arr])
    用的是每次初始化的值，所以能够清空内容。
    不能先使用setPoetry(null)去清空内容后，又去使用setPoetry(...null,poetry),这样子是无效的，
    只会触发后面的setPoetry(...null,poetry)，前面并没有起到清空效果。
    initPoetry
  */
  // 上拉刷新页面(清空后重新加载)
  const initGetPoetry = () => {
    setUrl('https://cdn.seovx.com/ha/img/mom-ha-20-2%20('+Math.floor(Math.random()*80)+').jpg')
    axiosQuery(initPoetry)
    console.log('加载完成！');
  }
  // 下拉刷新添加内容(不清空内容 追加内容)
  const getPoetry = async() => {
    axiosQuery(poetry)
  }
  // 设置页面爱心状态 与数据的位置对应 主要修改的是favorite数组，触发页面渲染。
  const homeGetHeart = (poetry) => {
    getFavoriteData().then((res)=>{
        let flagArr = []
        poetry.map((item,index1) => {
          let flag:any =false
          if(res&&res.length){
            res.findIndex((value,index2,arr)=>{
              if(item.title==value.title){
                flag=true
              }
            })
          }else{
            flag=false
          }
          flagArr[index1] = flag
        })
        setFavorite(flagArr)
    })
  } 
  // 发送请求更新页面,每次请求频率不要超过600ms,参数是在这个数组的基础上添加数据来更新页面
  const axiosQuery = (tempArr: any) => {
    let favoriteArr
    
    getFavoriteData().then((res)=>{
      favoriteArr=res
    })
    const get = () => {
      let obj:a
      let arr:a[] = []
      const fn = () => {
         axios({
          method:'get',
          headers:{
            'X-User-Token':'AvxKVNKbBtaos3+RDo1wmBUxjySZi1Z3'
          },
          url:'https://v2.jinrishici.com/sentence'
        }).then((res)=>{
          let originData = res.data.data.origin
          // console.log(originData);
          // console.log(res.data.data);
          // console.log(originData);
            obj = {
            title: originData.title,
            author: originData.author,
            dynasty:originData.dynasty,
            content: originData.content,
            translate: originData.translate,
            oneContent:res.data.data.content,
            annotation: res.data.data.content,
            tag: res.data.data.matchTags,
            id:res.data.data.id,
            popularity:res.data.data.popularity,
            analyze: ""
          }
            arr.push(obj);
            let updateArr = [
              ...tempArr,
              ...arr
            ]
            setPoetry(updateArr);
            homeGetHeart(updateArr)
            // console.log('favoriteArr',favoriteArr);
            // console.log('updateArr',updateArr);
            // let flagArr = []
            // updateArr.map((item,index1) => {
            //   let flag:any =false
            //   favoriteArr.findIndex((value,index2,arr)=>{
            //     if(item.title==value.title){
            //       flag=true
            //     }
            //   })
            //   flagArr[index1] = flag
            // })
            // console.log(flagArr);
            // setFavorite(flagArr)  
        })
      }
      for (var i=1; i<=3; i++) {
        (function(j) {
            setTimeout( function timer() {
                fn()
            }, j*2000);
        })(i);
      }
    }
    throttle(get,4000)
}
  const scorllRefresh = (e:any) => {
    // console.log(e.nativeEvent);
    // console.log(e.nativeEvent.contentOffset.y);
    // console.log(e.nativeEvent.contentSize.height);
    const deviceHeight = e.nativeEvent.layoutMeasurement.height
    const nowHeight = e.nativeEvent.contentOffset.y;
    const height = e.nativeEvent.contentSize.height
    if(nowHeight + deviceHeight>height-1){
          getPoetry()
    }
  }
  const renderPoetry = () => {
    if(poetry[0]){
      return(
        poetry.map( (item,index) => 
          <View style={styles.mainText} key={index}>
            <TouchableOpacity onPress={() => navigation.navigate('Poetry',item)}>
              <View style={styles.mainHead}  >
                <Text style={styles.mainHeadText} >{item.title}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.mainTitle}>
              <Text style={styles.mainTitleText}>{item.author}({item.dynasty})</Text>
            </View>
            <View style={styles.mainContent}>
              <Text style={styles.mainContentText}>
                {item.content.map((content,index) => {
                  return (content+'\n')
                })}
              </Text>
            </View>
            <View style={styles.mainFooter}>
              <Text style={styles.mainFooterText}> 
                <TouchableOpacity onPress={
                  () => {
                    storeData(item).then(()=>{
                      homeGetHeart(poetry)
                    })
                  }
                }
                  >
                  <Icon name={favorite[index]?"heart":"heart-o"} size={20} color="skyblue" />
                </TouchableOpacity>
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Icon name="plus-circle" size={20} color="skyblue" />
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Icon name="share" size={20} color="skyblue" />
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Icon name="share-alt" size={20} color="skyblue" />
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Icon name="arrow-circle-o-right" size={20} color="skyblue" />
              </Text>
            </View>
          </View>
        )
      )
    }
    
  }
  if(poetry[0])return (
    <>
    <ScrollView
      onScrollBeginDrag={e => scorllRefresh(e)}
      // onScroll={e => scorllRefresh(e)}
      refreshControl={
        <RefreshControl 
        colors={['skyblue']}
          refreshing={refreshing} 
          onRefresh={initGetPoetry}
          />
      }
      >
      <View style={styles.body}>
        <View style={styles.topInput}>
          <Text style={styles.topSerach}>
          < Icon name="search" size={15} color="gray" />
          &nbsp;&nbsp; &nbsp; 搜索
            </Text>
        </View>
        <View  style={styles.mainText}>  
          {IMG}
          <Text style={styles.mainContnet}>
            { poetry[0].oneContent + '\n'}
            {poetry[0].author+'《'+poetry[0].title+'》'}
          </Text>
          <View style={styles.mainFooter}>
            <Text style={styles.mainFooterText}> 
              <Icon name="heart-o" size={20} color="skyblue" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="plus-circle" size={20} color="skyblue" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="share" size={20} color="skyblue" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="share-alt" size={20} color="skyblue" />
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Icon name="arrow-circle-o-right" size={20} color="skyblue" />
            </Text>
          </View>
        </View>
        {renderPoetry() }
        <ActivityIndicator size={'large'} color={'skyblue'}/>
      </View>
    </ScrollView>
    </>
  )
  return<><View><Text>默认内容</Text></View></>
}
export var styles = StyleSheet.create({
  tinyLogo:{
    borderRadius:20,
    height:200,
  },
 topInput: {
    backgroundColor:'white',
    // borderRadius:10,
    padding:0,
    fontSize:10
  },
  topSerach:{
    height:30,
    margin:10,
    borderRadius:10,
    backgroundColor:'rgb(238, 238, 238)',
    textAlign:'center',
    lineHeight:30,
  },
  mainContnet:{
    textAlign:'center',
  },
  mainText:{
    // height:100,
    marginTop:10,
    backgroundColor:'white',
    padding:10
  },
  mainHead:{
    height:30,
    backgroundColor:'white',
  },
  mainHeadText:{
    fontSize:20,
    color:'black'
  },
  mainTitle:{
    height:30,
    backgroundColor:'white ',
  },
  mainTitleText:{
    color:'rgb(189, 154, 0)',
    fontSize:13
  },
  mainContent:{
    maxHeight:180,
    // height:40,
    backgroundColor:'white',
    overflow:"hidden"
  },
  mainContentText:{
    color:'rgb(20, 19, 19)',
    lineHeight:30,
    fontSize:18
  },
  mainFooter:{
    height:40,
  },
  mainFooterText:{
    lineHeight:40,
  },
  body:{
    backgroundColor:'rgb(238, 238, 238)',
    height:'100%',
  }
});
export default Home 