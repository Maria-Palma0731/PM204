import React,{useState,useEffect,useCallback} from 'react';/**comenzamos importando */
import {SafeAreaView,View,Text,FlatList,StyleSheet,Pressable,} from 'react-native';
import {useFocusEffect, useRouter} from 'expo-router';

export default function ConsultaUsuariosScreen() {

  const [usuarios, setUsuarios] = useState([]);/*eliminamos el arreglo de usurios y lo hacemos en estado,iniciamos el estado de usuario */
  const router = useRouter();

  const obtenerUsuarios = async () => {
    try{
      const respuesta = await fetch('http://10.16.72.150/v1/usuarios');/*hacemos la peticion a la api */
      const datos= await respuesta.json();/*convertimos la respuesta a json */
      console.log("Respuesta API:",datos);/*mostramos la respuesta en consola */

      setUsuarios(datos.usuarios);

    }catch(error){
      console.log("Error de Api",error);
    }
  }

  useEffect(()=>{obtenerUsuarios();},[]) /* ejecutamos la función al cargar el componente */

  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const irADetalles = (usuario) => {
    router.push({
      pathname: '/detalle',
      params: {
        id: String(usuario.id),
      },
    });
  };

  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable style={styles.botonDetalle} onPress={() => irADetalles(item)}>
        <Text style={styles.textoBotonDetalle}>Ver detalles</Text>
      </Pressable>

    </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 12,
  },

  botonDetalle: {
    alignSelf: 'flex-end',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  textoBotonDetalle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

});