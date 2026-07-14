import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TarjetaPelicula} from '../components/tarjeta';

/*   ZONA 2: Componentes principales */
export default function TarjetaPelicula() {
  return (
    <View style={styles.container} >
      <TarjetaPelicula style={styles.tarjetaVerde} 
      Titulo="Lupita" 
      Genero="ComerScio" 
      Pelicula="algo" 
      />
      <TarjetaPelicula style={styles.tarjetaRoja} 
       Titulo="Lupita" 
      Genero="ComerScio" 
      Pelicula="algo" />
      <Perfil style={styles.tarjetaVerde} 
       Titulo="Lupita" 
      Genero="ComerScio" 
      Pelicula="algo" />
      
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