import * as React from "react"
import { Text,View,StyleSheet, TouchableOpacity} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavoriteData,storeData } from "../../func/throttle";
import { ScrollView } from "react-native-gesture-handler";
const PoetryList = ({navigation,route}:any) => {
    const [data,setData] = React.useState<any>()
    React.useEffect(()=>{
        getFavoriteData().then(res=>{
            setData(res)
        })
        // getData()
    },[])
    const pressHeart = (obj:any) => {
        console.log(1);
        storeData(obj).then(()=>{
            getFavoriteData().then(res=>{
                setData(res)
            })
        })
    }
    const renderPeotryList = () => {
        if(data)return(
            data.map((item:any,index:number)=>
            <View style={PoetryListStyle.main} key={index}>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('Poetry',{item})}>
                    <Text style={PoetryListStyle.mainContent}>
                        {item.oneContent}
                    </Text>
                </TouchableOpacity>
                    <Text style={{color:'rgb(189, 154, 0)',}}>
                        {item.author+'《'+item.title+'》'}
                    </Text>
                </View>
                <TouchableOpacity onPress={()=>pressHeart(item)}>
                    <Icon1 name="heart-dislike-outline" size={25} color="skyblue" />
                </TouchableOpacity>
                
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