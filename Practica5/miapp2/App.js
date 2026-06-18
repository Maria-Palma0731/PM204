/* Zona 1: Importaciones componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuScreen from './screens/MenuScreen';


/* Zona2: Main - componentes */
export default function App() {
  return (
    <View style={styles.container} >
      <MenuScreen></MenuScreen>

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
    flexDirection: 'column', /*Posicionamiento horizontal */ /*column-reverse invierte el orden de los componentes */
  }  
});
