
import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import * as Location from 'expo-location';

import WeatherInfo from './components/WeatherInfo';
import UnitPicker from './components/UnitPicker';
import { colors } from './utils';
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/WeatherDetails';
import config from './config';


const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {

  const [errorMessage,setErrorMessage] = useState(null)
  const [currentWeather,setCurrentWeather]=useState(null)
  const [unitSystem,setUnitSystem] = useState('metric')

  useEffect(()=>{
    load()
  },[unitSystem]);

  async function load(){
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Access to location is needed to run the app.')
        return
      }
      const location = await  Location.getCurrentPositionAsync()
      
      const {latitude,longitude} = location.coords
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${config.WEATHER_API_KEY}`
      const response = await fetch(weatherUrl)
      const result =await response.json()

      if(response.ok){
        setCurrentWeather(result)
      } else{
        setErrorMessage(result.message)
      }

    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  if(currentWeather){

    

    return (
      <View style={styles.container}>

        <View style={styles.main}>
          <UnitPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem}/>
          <ReloadIcon load={load}/>
          <WeatherInfo currentWeather={currentWeather}/>
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem}/>
        
      </View>
    );
  } else if(errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load}/>
        <Text style={{textAlign:'center'}}>{errorMessage}</Text>

      </View>
    );
  } else {
    return(
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR}/>

      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    
    
  },
  main:{
    justifyContent:"center",
    flex:1,
    
  },
});