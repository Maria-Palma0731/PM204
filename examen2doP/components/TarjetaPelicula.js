import { Text, View, StyleSheet } from "react-native";

export const TarjetaPelicula = (props) => {
    return (
        <View style={[styles.tarjeta, props.style]}>
            <Text style={styles.nombre}>{props.titulo}</Text>
            <Text style={styles.titulo}>{props.genero}</Text>
            <Text style={styles.otroTexto}>{props.pelicula}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    nombre: {
        fontSize: 24,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    tarjeta: {
        borderWidth: 2,
        padding: 15,
        margin: 10,
    },
    titulo: {
        fontSize: 18,
        color: 'gray',
        fontFamily: 'Roboto',
    },
    otroTexto: {
        fontSize: 12,
        fontFamily: 'Roboto',
        fontStyle: 'italic',
    },
});

