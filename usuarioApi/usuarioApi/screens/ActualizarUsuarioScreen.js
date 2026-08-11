import React, {useEffect, useState} from 'react';
import {SafeAreaView,View,Text,TextInput,Pressable,StyleSheet,Alert,Platform,ActivityIndicator} from 'react-native';
import {useLocalSearchParams, useRouter} from 'expo-router';

const API_URL = 'http://10.16.72.150:5000/v1/usuarios';
const AUTH_HEADER = typeof btoa === 'function' ? `Basic ${btoa('admin:1234')}` : 'Basic YWRtaW46MTIzNA==';

export default function ActualizarUsuarioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    setNombre(String(params.nombre ?? ''));
    setEdad(String(params.edad ?? ''));
  }, [params.nombre, params.edad]);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const guardarCambios = async () => {
    if (nombre.trim() === '' || edad.trim() === '') {
      mostrarMensaje('Vacios', 'Completa nombre y edad');
      return;
    }

    try {
      setCargando(true);

      const respuesta = await fetch(`${API_URL}/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: AUTH_HEADER,
        },
        body: JSON.stringify({
          nombre,
          edad: Number(edad),
        }),
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo actualizar');
      }

      mostrarMensaje('Exito', 'Usuario actualizado');
      router.back();
    } catch (error) {
      console.log('Error actualizando usuario:', error);
      mostrarMensaje('Error', 'No fue posible actualizar');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>

        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

        <Text style={styles.etiqueta}>Edad</Text>
        <TextInput style={styles.input} value={edad} keyboardType="numeric" onChangeText={setEdad} />

        <Pressable style={styles.boton} onPress={guardarCambios} disabled={cargando}>
          {cargando ? <ActivityIndicator color="#111827" /> : <Text style={styles.textoBoton}>Guardar cambios</Text>}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 18,
  },
  etiqueta: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    backgroundColor: '#F9FAFB',
  },
  boton: {
    backgroundColor: '#FACC15',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  textoBoton: {
    color: '#111827',
    fontWeight: 'bold',
  },
});