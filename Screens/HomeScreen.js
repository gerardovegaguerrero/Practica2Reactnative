import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Constants from 'expo-constants';
import { createIconSetFromFontello } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [lista, setLista] = useState([]);
  const [ciudad, setCiudad] = useState('');
  const [location, setLocation] = useState([]);
  const [temp, setTemp] = useState([]);
  const [consultado, setConsultado]= useState(false);

  
  const buscar = (ciudad) => {
    
    const key = 'fda8224083c71ec08e37978736b6b381';
    const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${key}&units=metric`;

    
      fetch(api_url)
        .then(data => {
            return data.json();
        }).then(resultado => {
         console.log(resultado);


         if(resultado.message ==="city not found"){
          setConsultado(false);
         }
         else{
          setConsultado(true);
          
          let temporalcoord = 0; 
          let temporaltemperatura =0;
          let temporaloc = 0;
          temporalcoord = resultado.coord;
          temporaltemperatura = resultado.main;
          temporaloc = resultado.sys;
         
          //Info de temperaturas
          let temporaltemp = [];
          temporaltemp.push(temporaltemperatura.temp);
          temporaltemp.push(temporaltemperatura.temp_max);
          temporaltemp.push(temporaltemperatura.temp_min);

          //Info de coordenadas
          let temporalcoordenada = [];
          temporalcoordenada.push(temporalcoord.lon);
          temporalcoordenada.push(temporalcoord.lat);

          //Infor de ciudad
          let temporallocaliza = [];
          temporallocaliza.push(temporaloc.country)
          temporallocaliza.push(resultado.name)

          
          setLista(temporaltemp);
           setLocation(temporalcoordenada);
          setTemp(temporallocaliza);
         

         }
         
      });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}> El clima</Text>
      <SearchBar
        round
        containerStyle={{
          backgroundColor: 'white',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        }}
        inputStyle={{ backgroundColor: 'white' }}
        onChangeText={(texto) => {
          setCiudad(texto)
          buscar(texto);
        }}
        onClear={() => {
          setLista([]);
          setCiudad("")
          setConsultado(false);
        }}
        value={ciudad}
        placeholder="Escribe aqui..."
      />

      <View style={{ margin: 10, fontSize: 20 }}>
        {
          consultado 
          ?
          <View style={{ margin: 10, fontSize: 20 }}>
            <Text style={styles.container1}> {temp[1]}, {temp[0]}{}</Text>
            <Text style={styles.container1}> Temperatura actural = {lista[0]} c°</Text>
            <Text style={styles.container1}> Temperatura máxima = {lista[1]} c°</Text>
            <Text style={styles.container1}> Temperatura mínima = {lista[2]} c°</Text>
            <Button
                color= "#A9A9A9"
                title="Pronostico" 
                onPress={()=>navigation.navigate('DetailScreen',{nombre:temp[1],lon:location[0],lat:location[1]})}
            />
          </View>
          :
          <Text style={styles.texto}>
              Realiza una busqueda
          </Text>
        }
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  container1: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
  },
});
  