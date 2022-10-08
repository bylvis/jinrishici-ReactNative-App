// import 'react-native-gesture-handler';
import * as React from 'react';
import { Text, View,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/page/Home';
import My from './src/page/my';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Poetry from './src/page/poetry';
import MyFavorite from './src/page/MyFavorite';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen'
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()
const TabStack = () => {
  React.useEffect(()=>{
    SplashScreen.hide();
  },[])
  return(
    <>  
     <StatusBar backgroundColor="white" barStyle={'dark-content'} />
       <Tab.Navigator >
        <Tab.Screen 
          name="首页" 
          component={Home} 
            options={
              {
                tabBarIcon: ()=> <Icon name="home" size={30} color="skyblue" />,
                headerShown:false
              }
            }
        />
        <Tab.Screen
          name="我的" 
          component={My} 
          options={
            {
              tabBarIcon: ()=>  <Icon name="user" size={30} color="skyblue" />,
              headerTitle:('我的'),
              headerTitleAlign: 'center',
              headerStyle:{
                height:30
              },
              // title:<Text>1</Text>,
              headerTitleStyle:{
                color:'black'
              },
            }
          }/>
      </Tab.Navigator>
    </>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Main' component={TabStack}  
          options={
              {
                animation:'fade_from_bottom',
                headerShown:false
              }
            }></Stack.Screen>
        <Stack.Screen name='Poetry' component={Poetry}  
          options={
              {
                title:'',
                animation:'slide_from_right',
                // headerShown:false
              }
            }></Stack.Screen>
        <Stack.Screen name='MyFavorite' component={MyFavorite}  
          options={
              {
              headerShadowVisible:false,
              animation:'slide_from_right',
              // headerShown:false
              headerTitle:('我的收藏'),
              headerTitleAlign: 'center',
              headerTitleStyle:{

              },
              headerStyle:{
                
              }
              // headerStyle:{
              // backgroundColor:'red',
                
              // },
              }}
            ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}