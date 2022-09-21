import * as React from "react"
import { Text, View,StatusBar, StyleSheet,Switch,TouchableHighlight } from "react-native"
import { styles } from "./Home"
import { styleP } from "./poetry";
import Icon from 'react-native-vector-icons/FontAwesome';
interface MyData{
  days:number
}
const My = ({navigation}:any) => {
  let myData:MyData = {
    days:2,
  }
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <View>
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        
        <View style={myStyle.mainText}>
          <View style={myStyle.mainRow}>
            <Text style={myStyle.leftText}>打卡天数：{myData.days}天</Text>
            <Switch
            style={myStyle.mySwitch}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
                        <View style={styleP.border}></View>
          <View style={myStyle.mainRow}> 
            <TouchableHighlight 
            activeOpacity={0.5} 
            underlayColor="#ddddd"
            onPress={() => navigation.navigate('MyFavorite')}>
              <View style={myStyle.mainCol}>
                <Icon name="heart-o" size={30} color="skyblue" />
                <Text>我的收藏</Text>
              </View>
            </TouchableHighlight>
            <View style={myStyle.mainCol}>
              <Icon name="plus-square" size={30} color="skyblue" />
              <Text>我的补充</Text>
            </View>
            <View style={myStyle.mainCol}>
              <Icon name="book" size={30} color="skyblue" />
              <Text>我的背诵</Text>
            </View>
            <View style={myStyle.mainCol}>
              <Icon name="edit" size={30} color="skyblue" />
              <Text>我的标注</Text>
            </View>
          </View>
        </View>

        <View style={myStyle.mainText}>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>打赏0.01元(测试微信接入)</Text>
                <Icon name="money" size={25} color="skyblue" />
            </View>
          </TouchableHighlight>
                          <View style={styleP.border}></View>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>浏览历史</Text>
                <Icon name="history" size={25} color="skyblue" />
            </View>
          </TouchableHighlight>
        </View>

        <View style={myStyle.mainText}>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>分享APP</Text>
                <Icon name="chevron-right" size={15} color="skyblue" />
            </View>
          </TouchableHighlight>
                          <View style={styleP.border}></View>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>意见与反馈</Text>
                <Icon name="chevron-right" size={15} color="skyblue" />
            </View>
          </TouchableHighlight>
                          <View style={styleP.border}></View>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>去评分</Text>
                <Icon name="chevron-right" size={15} color="skyblue" />
            </View>
          </TouchableHighlight>
        </View>

        <View style={myStyle.mainText}>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>主题选择</Text>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                  <Text style={{marginRight:5}}>纯白</Text>
                  <Icon name="chevron-right" size={15} color="skyblue" />
                </View>         
            </View>
          </TouchableHighlight>
                          <View style={styleP.border}></View>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>字体选择</Text>
                <View style={{flexDirection:"row",alignItems:'center'}}>
                  <Text style={{marginRight:5}}>宋体</Text>
                  <Icon name="chevron-right" size={15} color="skyblue" />
                </View>
            </View>
          </TouchableHighlight>
                          <View style={styleP.border}></View>
          <TouchableHighlight 
            activeOpacity={0.5} 
            onPress={()=>{}}
            underlayColor="#ddddd">
            <View style={myStyle.mainRow}>
                <Text style={myStyle.leftText}>更多</Text>
                <Icon name="chevron-right" size={15} color="skyblue" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </>
  )
}
var myStyle= StyleSheet.create({
  mainText:{
    marginTop:10,
    padding:10,
    backgroundColor:'white'
  },
  mainRow:{
    padding:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  mainCol:{
    padding:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'column'
  },
  leftText:{
    color:'black',
    fontSize:18
  },
  mySwitch:{
    // position:'absolute',
    // right:0,
    // top:'50%',
  }
})
export default My