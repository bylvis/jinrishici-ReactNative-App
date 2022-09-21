import * as React from "react"
import { Text,View,StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavoriteData } from "../../func/throttle";
import { ScrollView } from "react-native-gesture-handler";
const PoetryList = () => {
    const [data,setData] = React.useState<any>()
    React.useEffect(()=>{
        getData()
    },[])
    const getData = async () => {
        try {
          let oldValue = await AsyncStorage.getItem('@favorite_poetry')
          if(oldValue){
            oldValue=JSON.parse(oldValue)
          }else{
            oldValue=null
          }
          setData(oldValue)
        //   return oldValue
        } catch(e) {
          // read error
        }
      }
    const renderPeotryList = () => {
        if(data)return(
            data.map((item,index)=>
            <View style={PoetryListStyle.main} key={index}>
                <View>
                    <Text style={PoetryListStyle.mainContent}>
                        {item.oneContent}
                    </Text>
                    <Text style={{color:'rgb(189, 154, 0)',}}>
                        {item.author+'《'+item.title+'》'}
                    </Text>
                </View>
                <Icon name="heart-o" size={25} color="skyblue" />
            </View>
        ))
    }
    
    return(
        <>
        <ScrollView>
            {renderPeotryList()}
        </ScrollView>
        
        </>
    )
}
export var PoetryListStyle = StyleSheet.create({
    main:{
        padding:10,
        marginTop:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    mainContent:{
        marginBottom:10,
        fontSize:20,
        color:'black'
    }
})
export default PoetryList