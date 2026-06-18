import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function PressableSwitchScreen() {
  return (
    <View style={styles.container} >

    <Text>Aqui va la practica de Scroll</Text>
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
  }
});