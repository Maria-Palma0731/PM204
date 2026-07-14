import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {TarjetaPelicula} from './components/TarjetaPelicula';

/* Zona2: Main - componentes */
export default function App() {
  return (
    <View style={styles.container} >
      <Text>Cartelera</Text>
      <TarjetaPelicula
        
        titulo="Lupita"
        genero="Comedia"
        pelicula="Nosotros los Nobles"
      />
      <TarjetaPelicula
      
        titulo="Coco"
        genero="Animación"
        pelicula="Coco"
      />
      <TarjetaPelicula
        titulo="Roma"
        genero="Drama"
        pelicula="Roma"
      />
      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    tarjetaVerde: {
      backgroundColor: 'green',
    },
    tarjetaRoja: {
      backgroundColor: 'red',
    },
});




















