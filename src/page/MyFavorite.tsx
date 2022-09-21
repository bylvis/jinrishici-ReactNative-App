import * as React from "react"
import { StyleSheet, Text,View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AuthorList from "./components/authorList";
import PoetryList from "./components/poetryList";
const Tab = createMaterialTopTabNavigator();
const MyFavorite = () => {
    return(
        <>
            <Tab.Navigator 
                screenOptions={{
                tabBarLabelStyle: { fontSize: 16 },
                tabBarPressColor:'rgba(12, 195, 250,.1)',
                tabBarPressOpacity:0.1,
                tabBarActiveTintColor:'rgb(189, 154, 0)',
                tabBarInactiveTintColor:'black',
                tabBarIndicatorStyle:{
                    backgroundColor:'skyblue'
                }
            }}>
              <Tab.Screen name="诗歌" component={PoetryList} />
              <Tab.Screen name="作者" component={AuthorList} />
            </Tab.Navigator>
        </>
        
    )
}

export default MyFavorite