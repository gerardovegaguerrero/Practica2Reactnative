import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Card, ListItem, Button, Icon } from 'react-native-elements'


const DetailScreen = ({route}) => {
    const {nombre} = route.params;
    const {lon} = route.params;
    const {lat} = route.params;
    const [datos, setDatos]=useState([]);

    useEffect(()=>{
        const apikey ='fda8224083c71ec08e37978736b6b381';
        const api_url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apikey}&units=metric`
        fetch(api_url)
            .then(data => {
                return data.json()
            }).then(resultado=>
            {
                let temparreglodetalles = [];
                temparreglodetalles = resultado.daily;
                setDatos(temparreglodetalles);
               
            });

    },[])

    const test = (_dt,_i) =>{         
        console.log(_i)
        var day = new Date(_dt * 1000);  
        if(_i==0){
            return "HOY"
        }
        else{
            return day.toLocaleString("es-mx", { weekday: "long" }).toUpperCase(); 
        }        
        
    }

    return (  
        <View style={styles.container}>   
         <ScrollView>      
            {
                datos.map((a,i)=>
                    <Card>
                    <Card.Title>{test(a.dt,i)}</Card.Title>
                    <View key={i}>
                        <Text key={i} style={styles.container1}>Temperatura del día = {a.temp.day} c°</Text>
                        <Text key={i+1} style={styles.container1}>Temperatura Máxima del día = {a.temp.max} c°</Text>
                        <Text key={i+2} style={styles.container1}>Temperatura Mínima del día = {a.temp.min} c°</Text> 
                    </View> 
                    </Card>            
                )
            }
          </ScrollView>                
        </View>
    
        
        
      ); 
}
 
export default DetailScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#c1c1c1',
    },
    container1:{
        color: 'black', 
        textAlign: 'right', 
        fontSize: 15,
        margin: 10,
    },
   
  });