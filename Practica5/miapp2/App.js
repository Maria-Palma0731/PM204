/* Zona 1: Importaciones componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';
import {Perfil} from './components/Perfil';



/* Zona2: Main - componentes */
export default function App() {
  return (
    <View style={styles.container} >
      <Image source={require('./assets/wave.png')}/>
      <Text>Hola Mundo React Native</Text>
    {/*   <Text> ----------------------------</Text>
      <Saludo></Saludo>
      <Saludo/>
      <Text> ----------------------------</Text>
      <Saludo2/>
      <Text> ----------------------------</Text> */}
      <Perfil style={styles.tarjetaVerde} 
      nombre="Lupita" 
      carrera="ComerScio" 
      materia="algo" 
      cuatri="6"/>
      <Perfil style={styles.tarjetaRoja} 
      nombre="Maria" 
      carrera="Sistemas computacionales" 
      materia="Programacion Móvil" 
      cuatri="9"/>
      <Perfil style={styles.tarjetaVerde} 
      nombre="Angeles" 
      carrera="ComerScio" 
      materia="algo" 
      cuatri="6"/>
      
      <StatusBar style="auto" />
    
    </View>
  );
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row', /*Posicionamiento horizontal */ /*column-reverse invierte el orden de los componentes */
  },
    tarjetaVerde: {
      backgroundColor: 'green',
    },
    tarjetaRoja: {
      backgroundColor: 'red',
    },
  
});
