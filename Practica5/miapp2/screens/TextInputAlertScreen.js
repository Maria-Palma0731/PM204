import {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Alert, Platform, Button } from 'react-native';

export default function TextInputAlertScreen() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [numero, setNumero] = useState('');
  const [telefono, setTelefono] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [comentario, setComentario] = useState('');
  const [decimal, setDecimal] = useState('');

  const campos = [
    {Label: 'Nombre', value: nombre},
    {Label: 'Email', value: email},
    {Label: 'Contraseña', value: pass  ? 'ingresada': 'No ingresada', },
    {Label: 'Número', value: numero},
    {Label: 'Edad', value: numero},
  ];

  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
      return;
    }
    Alert.alert(titulo, mensaje, botones);
  };

  // Alert 1
  const confirmarEnvio = () => {
    mostrarAlerta(1, 
      'Confirmar envio',
      'Si esta seguro de enviar el formulario',
      [
        {
          text: 'Cancelar',
          onPress: () => mostrarAlerta('Cancelado', 'No se envio nada'),
          Style: 'cancel',
        },
        {
          text : 'Confirmar',
          onPress: () => mostrarAlerta('Enviado', 'Se envio el formulario')
        },
      ]
    );
  };

  // Alert 2
  const validarNombre = () => {
    if (nombre === '') {
      mostrarAlerta('Error', 'Por favor escribe tu nombre');
    } else {
      mostrarAlerta('Nombre guardardo', `Hola ${nombre}, tu nombre fue guardado`);
    }
  };

  //Alert 3
  const validarEmail = () => {
    if (email === ''){
      mostrarAlerta('Error', 'ingresa tu email');
    } else if (!email.includes('@')) {
      mostrarAlerta('Error', 'Ingresa un email valido');
    } else {
      mostrarAlerta('Email guardado', `Tu email ${email} fue guardado`);
    }
  };

  return (
    <ScrollView style={styles.container} >

    <Text style={styles.text}>Ejemplos de input</Text>
    <Text style={styles.text}>Nombre</Text>
    <TextInput
      value={nombre}
      onChangeText={setNombre}
      placeholder="Ingrese su nombre"
      autoCapitalize="words"
      style={styles.input}
    />

    <Text style={styles.text}>Email</Text>
    <TextInput
      value={email}
      onChangeText={setEmail}
      placeholder="Ingrese su email"
      keyboardType="email-address"
      autoCapitalize="none"
      style={styles.input}
    />

    <Text style={styles.text}>Contraseña</Text>
    <TextInput
      value={pass}
      onChangeText={setPass}
      placeholder="Ingrese su contraseña"
      secureTextEntry={true}
      maxLength={8}
      keyboardType="numeric"
      style={styles.input}
    />

    <Text style={styles.text}>Edad</Text>
    <TextInput
      value={numero}
      onChangeText={setNumero}
      placeholder="Ingrese su edad"
      keyboardType="numeric"
      style={styles.input}
    />

    <Text style={styles.text}>Telefono</Text>
    <TextInput
      value={telefono}
      onChangeText={setTelefono}
      placeholder="Ingrese su teléfono"
      keyboardType="phone-pad"
      style={styles.input}
    />

    <Text style={styles.text}>Busqueda</Text>
    <TextInput
      value={busqueda}
      onChangeText={setBusqueda}
      placeholder="Ingrese su búsqueda"
      keyboardType='default'
      style={styles.input}
    />

    <Text style={styles.text}>Precio</Text>
    <TextInput
      value={decimal}
      onChangeText={setDecimal}
      placeholder="Ingrese el precio"
      keyboardType='decimal-pad'
      style={styles.input}
    />
    <Text style={styles.text}>Comentario</Text>
    <TextInput
      value={comentario}
      onChangeText={setComentario}
      placeholder='Ingrese su comentario'
      multiline={true}
      numberOfLines={4}
      keyboardType='default'
      style={styles.input}
    />
    <View style={styles.botonesContainer}>
      <View style={styles.botonWrapper}>
        <Button title='Guardar nombre' onPress={validarNombre} />
      </View>
      <View style={styles.botonWrapper}>
        <Button title='Guardar email' onPress={validarEmail} />
      </View>
    </View>

    </ScrollView>
  );
}

/*Zona3: Estilos y posicionamiento*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 12,
  },
  title: {
    fontSize: 22, frontWeight: '600', marginBottom: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12
  },
  botonesContainer: {marginTop: 20, gap:8},
  botonWrapper: {marginBottom: 4}
  
});