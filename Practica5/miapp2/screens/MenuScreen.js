/* Zona 1: Importaciones componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React,{useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import SafeAreaScrollScreen from './SafeAreaScrollScreen';
import PressableSwitchScreen from './PressableSwitchScreen';
import TextInputAlertScreen from './TextInputAlertScreen';
import FlatListSectionListScreen from './FlatListSectionListScreen';
import ImageBackgroundSlapshScreen from './ImageBackgroungSlapshScreen';
import ActivityIndicatorKeyboardScreen from './ActivityIndicatorKeyboardScreen';
import ModalBottomSheetScreen from './ModalBottomSheetScreen';

/* Zona2: Main - componentes */
export default function MenuScreen() {
    const [screen, setScreen]= useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>;
            case 'SafeArea':
                return <SafeAreaScreen/>;
                case 'SafeArea & Scroll':
                  return <SafeAreaScrollScreen/>;
                  case 'Pressable & Switch':
                    return <PressableSwitchScreen/>;
                      case 'TextInput & Alert':
                        return <TextInputAlertScreen/>;
                          case 'FlatList & SectionList':
                            return <FlatListSectionListScreen/>;
                            case 'ImageBackground & Slapsh':
                              return <ImageBackgroundSlapshScreen/>;
                              case 'ActivityIndicator & Keyboard':
                                return <ActivityIndicatorKeyboardScreen/>;
                              case 'Modal & BottomSheet':
                                return <ModalBottomSheetScreen/>;
                    case 'menu':
                    default:           
  return (
    <View style={styles.container} >
      <>
        <Button title='Practica Tarjetas' onPress={() => setScreen('tarjetas')}/>
        <Button title='Practica SafeAreaView' onPress={() => setScreen('SafeArea')}/>
        <Button title='Practica SafeArea & Scroll' onPress={() => setScreen('SafeArea & Scroll')}/>
        <Button title='Practica Pressable & Switch' onPress={() => setScreen('Pressable & Switch')}/>
        <Button title='Practica TextInput & Alert' onPress={() => setScreen('TextInput & Alert')}/>
        <Button title='Practica FlatList & SectionList' onPress={() => setScreen('FlatList & SectionList')}/>
        <Button title='Practica ImageBackground & Splash' onPress={() => setScreen('ImageBackground & Slapsh')}/>
        <Button title='Practica ActivityIndicator & Keyboard' onPress={() => setScreen('ActivityIndicator & Keyboard')}/>
        <Button title='Practica Modal & BottomSheet' onPress={() => setScreen('Modal & BottomSheet')}/>
      </>
      <StatusBar style="auto" />
    </View>
        );
    }
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column', /*Posicionamiento horizontal */ /*column-reverse invierte el orden de los componentes */
  }
});