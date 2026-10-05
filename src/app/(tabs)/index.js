import { StyleSheet, Text, View ,Button, TouchableOpacity,ScrollView,Pressable } from 'react-native';
 import { TextInput } from 'react-native-paper';
import {SafeAreaView  } from'react-native-safe-area-context';
import{ useState } from 'react';
import {StatusBar} from 'expo-status-bar';
import{router } from 'expo-router';
import {useTasks} from '../../contexts/taskContets';
import {useColors} from'../../contexts/ColorContets' 

export default function Home() { 

const {task,setTask,tasks,setTasks,selectedTask,setSelectedTask}=useTasks();
const { colors,  StatusBarStyle} = useColors();
const isDark = colors.background === '#0B121E';
const accent = isDark ? '#5e5757' : '#0077CC';

 const addTask = () => {   // function new button sichan yseral
  const trimmed = task.trim();  //space yatefal e.g  |    learn react |--> | learn react| 
  if (trimmed.length>0)  {  // snt fidel endesafe yfetshal

  //  hulu yametal trimmed wtetun ykeyral
    setTask("") //button keteneka behuala learn react blen yesafnew ytefal(clane endiyaderg)
    setSelectedTask(trimmed); //ahun yemeretkut task screen lay askemtlgni
   router.push({pathname:'/focusTime',})
                
  }
};
    
  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors.background}]}>
      <StatusBar style={StatusBarStyle}/>
      <View style={[styles.header,{backgroundColor:colors.background}]}>
        <Text style={[styles.headerTitle,{color:colors.textPrimary}]}>Focus</Text>
        <Text style={[styles.headerSubTitle,{color:colors.textSecondary}]}>what do want to work on?</Text>
      </View>
     <View  style= { styles.inputcontainer}>
     < TextInput 
     placeholder="what would you like to focus on..." 
     mode = "outlined"
     textColor={colors.textPrimary}
     placeholderTextColor={colors.textTertiary}
     outlineColor={colors.outline}
     activeOutlineColor={colors.primary}
     style={[styles.textinput,{backgroundColor:colors.surface,borderRadius:10,paddingHorizontal:15}]}  
     value={task}
     onChangeText={ (text) => setTask(text )}
     />
    < TouchableOpacity
      style={[styles.fabbutton,{backgroundColor:colors.background,borderColor:colors.outline}]} 
       onPress={() =>{
        addTask();}}
       //changeScreen();
      
         >
        <Text
       style={[ styles.fabText, {color: accent}]}>+</Text>
      </ TouchableOpacity>
     </View>
          <View style={styles.focusedtaske}>
      <Text style={[styles.focuseTitle,{color:colors.textPrimary}]}>Previous Focsed Tasks:</Text>
  
      <ScrollView style= {{padding:20}} contentContainerStyle={{ gap:20} } >
      {tasks.map(( task,index) =>(
        <Pressable
        style={[styles.tasksList,{backgroundColor:colors.surface,borderWidth:1,borderColor:colors.outline}]}
        key={index}
        onPress={() =>{
          setSelectedTask(task);
          router.push({
            pathname:"/focusTime",
          })
        }}
        >
      <Text style={[styles.taskText1,{color:colors.textSecondary}]}>
        {index + 1}
      </Text>

      <Text
      key ={index}
      style={[styles.taskText, {color:colors.textPrimary}]}
      >
        {task}
      </Text>
     </Pressable>
      ))}
       </ScrollView>
  
  
    
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  header:{
    padding:20,
  },
  headerTitle:{
  fontWeight:"bold",
    fontSize:30,
  },
  headerSubTitle:{
  fontSize:18,
    color:"white",
  },
  inputcontainer:{

  flexDirection:'row',
  padding:10,
  gap:10,
  
  },
  textinput:{
    flex:1,
  },
 

fabbutton:{
    width:50,
    height:50,
    justifyContent:'center',
    alignItems:'center',
   backgroundColor:'transparent',
   borderRadius:25,
   borderWidth:2,
   borderColor:'white',
   marginLeft:10,

  },
  fabText:{
    fontSize:30,
    color:'#fff',
  },
  focusedtaske:{
    margin:20,
    padding:10,
    flex:1,
  },
  focuseTitle:{
    fontWeight:'bold',
    fontSize:26,
    marginLeft:10,
    color:'white'
  },
  taskText:{
    fontWeight:'600',
    fontSize:18,
    color:'#fff',
    padding:10,
  },
  taskText1:{
    fontWeight:'600',
    fontSize:18,
    color:'#fff',
    padding:10,
  },
  taskBackground:{
    flex:1,
    resizeMode:'cover',
    overflow:'hidden',
    borderRadius :20,
    marginTop:20,
  },
  tasksList:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    borderRadius:10,
  },


});