/*ZONA1: importaciones compponentes y archivos*/
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* Zona2: Main - componentes */
export default function SafeAreaScrollScreen() {
    const [mostrarMensaje, setMostrarMensaje] = useState(true);
    return (
        <SafeAreaView style={style.safe} edges={['top', 'bottom']}>
            <View style={style.encabezado}>
                <Text style={style.texto}>ESTO ES UN ENCABEZADO</Text>
            </View>
            {mostrarMensaje && (
                <View style={style.mensaje}>
                    <Text style={style.MensajeTexto}>ESTO ES UN MENSAJE</Text>
                    <TouchableOpacity onPress={() => setMostrarMensaje(false)}>
                        <Text style={style.mensajeCerrar}>x</Text>
                    </TouchableOpacity>
                </View>
            )}
            <ScrollView style={style.scroll}
            contentContainerStyle={style.listaContenido}
            showsVerticalScrollIndicator={false}>
                {['comprar pan', 'estudiar react native', 'aprender importaciones', 'llamar a alguien', 'revisar un correo', 'leer un libro', 'practicar guitarra',
                'sacar a pasear el perro', 'hacer la tarea'
                ].map((tarea, i) => (
                    <View key = {i} style = {style.tarjeta}>
                        <Text style={style.tarjetaTexto}>{tarea}</Text>
                    </View>
                ))}
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

/*ZONA3: estilos y posicionamientos*/
const style = StyleSheet.create({
    safe: { flex: 1, backgroundColor: 'blue' },
    encabezado: { padding: 20, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' },
    texto: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    mensaje: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    MensajeTexto: { color: 'white', fontSize: 20, fontWeight: 'bold' },
    mensajeCerrar: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 20 },
    scroll: {flex:1},
    listaContenido: {padding: 16, paddingBottom: 40},
    tarjeta: {backgroundColor: '#f4f4f4f4', borderRadius: 10, padding:16, marginBottom: 10},
    tarjetaTexto: {fontSize: 15, color: 'black'},
})