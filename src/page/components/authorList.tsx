import * as React from "react"
import { Text,View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { PoetryListStyle } from "./poetryList";
const AuthorList = () => {
    let data = [{
        author:'杜甫'
    }]
    return(
        <>
        <View style={PoetryListStyle.main}>
            <View>
                <Text style={PoetryListStyle.mainContent}>
                    {
                        data[0]?data.map((item,index)=>{
                            return(item.author)
                        }):'暂无'
                    }
                </Text>
              
            </View>
            <Icon name="heart-o" size={25} color="skyblue" />
        </View>
    </>
    )
}
export default AuthorList