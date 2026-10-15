import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import TaskProvider from "../contexts/taskContets"
import ColorProvider from '../contexts/ColorContets';
import {useState,useEffect} from 'react'
import{useColors}from'../contexts/ColorContets'
import {getItems,setItems} from"../Utils/Storage";
import OnBoarding from '../Components/Onboarding';
import {useFonts,Righteous_400Regular } from "@expo-google-fonts/righteous"

export default function RootLayout({children}){
  const [fontsLoaded]=useFonts({
    Righteous_400Regular
  });
  

 const[showOnboarding, setShowOnboarding]=useState(false);
  const checkOnboardingStatus = async () => {
      try {
        const onboardingCompleted=
        await getItems("onboardingCompleted");
        setShowOnboarding(onboardingCompleted!=="true");
      }catch (error) {
        console.error("Error checking onboarding status:",error);
      }
    };
  useEffect(()=> {
     checkOnboardingStatus();
  },[])
if(!fontsLoaded){
  return null;
}

  const DrawerContent =()=> {
    const {colors,statusBarStyle } =useColors();
    return (
      <Drawer
        screenOptions={{
          drawerStyle: {backgroundColor:colors.background},
          headerStyle: { backgroundColor: colors.background,elevation:0,borderWidth:0 },
          headerTintColor:colors.textPrimary,
        }}
        >
        <Drawer.Screen  tt
      name="(tabs)"
    options={{
      title:"Focus Timer",
      headerTitleStyle:{ fontFamily:
       ' Righteous_400Regular' , fontSize:28},
      
    }}
        />
         </Drawer>
    );
  }

return(
  <ColorProvider>
    <TaskProvider>
      {showOnboarding ? <OnBoarding/> : children}
      <DrawerContent/>
    </TaskProvider>
  </ColorProvider>
)}