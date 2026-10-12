import React from 'react';
import {StyleSheet,View,Text,Pressable } from 'react-native';
import {useColors} from '../../contexts/ColorContets';
import {SafeAreaView  } from'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import { Ionicons} from '@expo/vector-icons';
const Setting =()=>{
  const {colors,toggleTheme,StatusBarStyle,isDark}=useColors();
    return ( 
  <View style ={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.surface}} >
    <StatusBar style={StatusBarStyle}/>
    <View style ={[styles.header,{backgroundColor:colors.background}]}>
    <Pressable onPress={toggleTheme} style={{  backgroundColor:colors.surface, padding:20,gap:10,flexDirection:'row',width:'100%',marginTop:20,padding:10, borderRadius:5 }}>
      <Ionicons name={isDark? 'moon':'sunny' } size={20} color={colors.onPrimary} style={{marginLeft:10}}/>
      <View>
          <Text style={{ fontSize:20,color:colors. textPrimary  }}> Appearance</Text>
            <Text style={{ fontSize:12,color:colors. textPrimary  }}> Dark Mode</Text>
      </View>
    </Pressable>
    <Pressable onPress={toggleTheme} style={{  backgroundColor:colors.surface, padding:20,gap:10,flexDirection:'row',width:'100%',marginTop:20,padding:10, borderRadius:5 }}>
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
marginBottom:500,
  }
})
export default Setting;