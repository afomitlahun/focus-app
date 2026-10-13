import React from 'react';
import {StyleSheet,View,Text,Pressable } from 'react-native';
import {useColors} from '../../contexts/ColorContets';
import {SafeAreaView  } from'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import { Ionicons} from '@expo/vector-icons';
const Setting =()=>{
  const {colors,toggleTheme,StatusBarStyle,isDark}=useColors();
    return ( 
  <View style ={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.background}} >
    <StatusBar style={StatusBarStyle}/>
    <View style ={[styles.header,{backgroundColor:colors.surface}]}>
    <Pressable onPress={toggleTheme} style={{  backgroundColor:colors.surface, padding:10,flexDirection:'row',marginTop:20, }}>
      <Ionicons name={isDark? 'moon':'sunny' } size={20} color={colors.onPrimary} style={{marginLeft:10}}/>
      <View>
          <Text style={{ fontSize:20,color:colors. textPrimary  }}> Appearance</Text>
            <Text style={{ fontSize:12,color:colors. textPrimary  }}> Dark Mode</Text>
      </View>
    </Pressable>
    <Pressable onPress={()=>{}} style={{  backgroundColor:colors.surface, padding:10,flexDirection:'row',marginTop:20, }}>
      <Ionicons name={'notifications-outline' } size={20} color={colors.onPrimary} style={{marginLeft:10}}/>
      <View>
          <Text style={{ fontSize:20,color:colors. textPrimary  }}> Notification</Text>
            <Text style={{ fontSize:12,color:colors. textPrimary  }}> Mange Notion</Text>
      </View>
    </Pressable>
    </View>
        </View>
  
    );
}
const styles = StyleSheet.create({
  header:{
width:'85%',
marginBottom:500,
  }
})
export default Setting;