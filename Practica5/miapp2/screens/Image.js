/* ZONA 1: Importaciones */
import { useState } from 'react';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';

/* ZONA 2: Componente principal */
export default function ImageBackgroundScreen() {
  const [imagenIndex, setImagenIndex] = useState(0);
  const [blur, setBlur] = useState(0);

  const imagenes = [
    require('../assets/fondo1.jpg'),
    require('../assets/fondo2.jpg'),
    require('../assets/fondo3.jpg'),
  ];

  return (
    <ImageBackground
      source={imagenes[imagenIndex]}
      style={styles.contenedor}
      imageStyle={styles.imagen}
      blurRadius={blur}
    >

      <View style={styles.tarjeta}>

        <Text style={styles.subtitulo}>
          ImageBackground
        </Text>

        <Text style={styles.subtitulo}>
          Imagen {imagenIndex + 1} de {imagenes.length}
        </Text>

        <Button
          title="Cambiar imagen"
          onPress={() => setImagenIndex((imagenIndex + 1) % imagenes.length)}
          color="#00B4D8"
        />

        <View style={styles.espacio} />

        <Text style={styles.subtitulo}>
          blurRadius: {blur}
        </Text>

        <Button
          title={blur > 0 ? 'Quitar blur' : 'Aplicar blur'}
          onPress={() => setBlur(blur > 0 ? 0 : 10)}
          color="#7B68EE"
        />

      </View>

    </ImageBackground>
  );
}

/* ZONA 3: Estilos */
const styles = StyleSheet.create({

  contenedor: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagen: {
    resizeMode: 'cover',
    opacity: 0.75,
  },

  tarjeta: {
    backgroundColor: '#000000aa',
    padding: 24,
    borderRadius: 16,
    width: '82%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff33',
  },

  subtitulo: {
    color: '#dddddd',
    fontSize: 13,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});