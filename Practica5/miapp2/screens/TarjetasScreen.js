import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Perfil} from '../components/Perfil';

/*   ZONA 2: Componentes principales */
export default function TarjetasScreen() {
  return (
    <View style={styles.container} >
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