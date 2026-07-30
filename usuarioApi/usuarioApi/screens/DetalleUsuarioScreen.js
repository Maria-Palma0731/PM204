import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView,View,Text,StyleSheet,Pressable,Modal,ActivityIndicator,Alert} from 'react-native';
import {useFocusEffect, useLocalSearchParams, useRouter} from 'expo-router';

const API_URL = 'http://10.177.95.192:5000/v1/usuarios';
const AUTH_HEADER = typeof btoa === 'function' ? `Basic ${btoa('admin:1234')}` : 'Basic YWRtaW46MTIzNA==';

export default function DetalleUsuarioScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const usuarioId = String(params.id ?? '');

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const obtenerUsuario = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();
      const encontrado = (datos.usuarios ?? []).find((item) => String(item.id) === usuarioId);
      setUsuario(encontrado ?? null);
    } catch (error) {
      console.log('Error cargando usuario:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerUsuario();
  }, [usuarioId]);

  useFocusEffect(
    useCallback(() => {
      obtenerUsuario();
    }, [usuarioId])
  );

  const confirmarEliminar = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetch(`${API_URL}/${usuarioId}`, {
        method: 'DELETE',
        headers: {
          Authorization: AUTH_HEADER,
        },
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo eliminar');
      }

      setModalVisible(false);
      router.replace('/consulta');
    } catch (error) {
      console.log('Error eliminando usuario:', error);
      Alert.alert('Error', 'No fue posible eliminar el usuario');
    } finally {
      setEliminando(false);
    }
  };

  const irActualizar = () => {
    if (!usuario) {
      return;
    }

    router.push({
      pathname: '/actualizar',
      params: {
        id: String(usuario.id),
        nombre: String(usuario.nombre ?? ''),
        edad: String(usuario.edad ?? ''),
      },
    });
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.containerCentrado}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!usuario) {
    return (
      <SafeAreaView style={styles.containerCentrado}>
        <Text style={styles.mensaje}>No se encontro el usuario.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>

        <Text style={styles.etiqueta}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <Text style={styles.etiqueta}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>

        <View style={styles.bloqueBotones}>
          <Pressable style={styles.botonActualizar} onPress={irActualizar}>
            <Text style={styles.textoBotonPrincipal}>Actualizar</Text>
          </Pressable>

          <Pressable style={styles.botonEliminar} onPress={() => setModalVisible(true)}>
            <Text style={styles.textoBotonPrincipal}>Eliminar</Text>
          </Pressable>
        </View>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalFondo}>
          <View style={styles.modalCaja}>
            <Text style={styles.modalTitulo}>Confirmar eliminacion</Text>
            <Text style={styles.modalTexto}>Estas seguro de que deseas eliminar al usuario {usuario.nombre}?</Text>

            <View style={styles.modalBotones}>
              <Pressable style={styles.modalCancelar} onPress={() => setModalVisible(false)} disabled={eliminando}>
                <Text style={styles.modalTextoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable style={styles.modalConfirmar} onPress={confirmarEliminar} disabled={eliminando}>
                <Text style={styles.modalTextoEliminar}>{eliminando ? 'Eliminando...' : 'Si, eliminar'}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
    justifyContent: 'center',
  },
  containerCentrado: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 10,
  },
  valor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  bloqueBotones: {
    marginTop: 24,
    gap: 12,
  },
  botonActualizar: {
    backgroundColor: '#FACC15',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotonPrincipal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCaja: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B91C1C',
    textAlign: 'center',
  },
  modalTexto: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    marginTop: 10,
  },
  modalBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  modalCancelar: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalConfirmar: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTextoCancelar: {
    color: '#111827',
    fontWeight: 'bold',
  },
  modalTextoEliminar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  mensaje: {
    fontSize: 16,
    color: '#374151',
  },
});