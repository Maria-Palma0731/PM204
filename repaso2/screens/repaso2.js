/* Zona 1: Importaciones componentes y archivos */
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, FlatList, Alert, Platform, ActivityIndicator, ImageBackground, TouchableOpacity, Image,} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

/* Zona 2: Main - componentes */
export default function Repaso2() {
  const [appLista, setAppLista] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    SplashScreen.setOptions({ duration: 500, fade: true });
    async function cargarRecursos() {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppLista(true);
      }
    }
    cargarRecursos();
  }, []);

  useEffect(() => {
    if (appLista) SplashScreen.hideAsync();
  }, [appLista]);

  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
      return;
    }
    Alert.alert(titulo, mensaje, botones);
  };

  const agregarLibro = () => {
    if (titulo === '' || autor === '' || genero === '') {
      mostrarAlerta('Error', 'Todos los campos son obligatorios.');
      return;
    }

    setGuardando(true);

    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros(prev => [...prev, nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setGuardando(false);
      mostrarAlerta('Éxito', 'Libro guardado correctamente.');
    }, 4000);
  };

  if (!appLista) {
    return (
      <View style={styles.splash}>
        <Image
          source={require('../assets/wave.png')}
          style={styles.splashImagen}
        />
        <Text style={styles.splashTexto}>Cargando...</Text>
        <StatusBar style="dark" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/fondo1.jpg')}
      style={styles.fondo}
    >
      <Text style={styles.titulo}>Catálogo de Libros</Text>
      <TextInput
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Título del libro"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        value={autor}
        onChangeText={setAutor}
        placeholder="Autor"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        value={genero}
        onChangeText={setGenero}
        placeholder="Género"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      {guardando ? (
        <View style={styles.guardandoContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.guardandoTexto}>Guardando...</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.boton} onPress={agregarLibro}>
          <Text style={styles.botonTexto}>Agregar Libro</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.contador}>Total de libros: {libros.length}</Text>
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.itemLibro}>
            <Text style={styles.libroTitulo}>{item.titulo}</Text>
            <Text style={styles.texto}>Autor: {item.autor}</Text>
            <Text style={styles.texto}>Género: {item.genero}</Text>
          </View>
        )}
      />
      <StatusBar style="light" />
    </ImageBackground>
  );
}

/* Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  splash: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
  splashImagen: {
    width: 100, height: 100, marginBottom: 16,
  },
  splashTexto: {
    fontSize: 18, fontWeight: '600', color: '#333',
  },
  fondo: {
    flex: 1, width: '100%', paddingTop: 50, paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 12,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.85)', borderRadius: 4, padding: 12, marginBottom: 6, fontSize: 15, color: '#111',
  },
  boton: {
    backgroundColor: '#1a5bb5', padding: 14, borderRadius: 4, alignItems: 'center', marginBottom: 8,
  },
  botonTexto: {
    color: '#fff', fontWeight: 'bold', fontSize: 16,
  },
  guardandoContainer: {
    alignItems: 'center', marginBottom: 8,
  },
  guardandoTexto: {
    color: '#fff', marginTop: 6, fontSize: 15, fontWeight: '600',
  },
  contador: {
    color: '#fff', fontWeight: 'bold', fontSize: 14, marginBottom: 6,
  },
  lista: {
    flex: 1,
  },
  itemLibro: {
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  libroTitulo: {
    fontSize: 15, fontWeight: 'bold', color: '#fff',
  },
  texto: {
    fontSize: 13, color: '#eee',
  },
});