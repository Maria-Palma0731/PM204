/* Zona 1: Importaciones componentes y archivos */
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Alert, Platform, Button, Switch } from 'react-native';

export default function Repaso1() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}\n\n${mensaje}`);
      return;
    }
    Alert.alert(titulo, mensaje, botones);
  };

  const enviarRegistro = () => {
    if (nombre === '' || carrera === '' || semestre === '') {
      mostrarAlerta('Campos incompletos', 'Debes llenar todos los campos.');
      return;
    }

    if (isNaN(semestre) || semestre.trim() === '') {
      mostrarAlerta('Error', 'El semestre debe ser un número.');
      return;
    }

    const mensaje = `Nombre: ${nombre}\n` + `Carrera: ${carrera}\n` + `Semestre: ${semestre}\n\n` + `Taller: ${taller ? 'Sí' : 'No'}\n` + `Constancia: ${constancia ? 'Sí' : 'No'}\n` + `Deportes: ${deportes ? 'Sí' : 'No'}`;
    mostrarAlerta('Registro enviado', mensaje, [{ text: 'Aceptar' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Registro de Evento Universitario</Text>
      <Text style={styles.text}>Nombre completo</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Ingrese su nombre"
        autoCapitalize="words"
        style={styles.input}
      />

      <Text style={styles.text}>Carrera</Text>
      <TextInput
        value={carrera}
        onChangeText={setCarrera}
        placeholder="Ingrese su carrera"
        autoCapitalize="characters"
        style={styles.input}
      />

      <Text style={styles.text}>Semestre</Text>
      <TextInput
        value={semestre}
        onChangeText={setSemestre}
        placeholder="Ingrese su semestre"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subtitulo}>Opciones</Text>

      <View style={styles.switchRow}>
        <Text style={styles.text}>¿Asistira al taller?</Text>
        <Switch value={taller} onValueChange={setTaller} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.text}>¿Requiere constancia?</Text>
        <Switch value={constancia} onValueChange={setConstancia} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.text}>¿Participara en deportes?</Text>
        <Switch value={deportes} onValueChange={setDeportes} />
      </View>

      <View style={styles.botonesContainer}>
        <View style={styles.botonWrapper}>
          <Button title='Enviar Registro' onPress={enviarRegistro} />
        </View>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

/* Zona 3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    marginTop: 10,
  },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 12,
  },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8,
  },
  botonesContainer: { marginTop: 30, gap: 8 },
  botonWrapper: { marginBottom: 4 },
});