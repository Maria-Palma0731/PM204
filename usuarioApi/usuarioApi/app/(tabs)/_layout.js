import {Tabs} from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Inicio" , href:null,}}/>
            <Tabs.Screen
                name="alta"
                options={{
                    title: "Registro de Usuarios",
                    tabBarIcon: ({ color, size }) => <AntDesign name="frown" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="consulta"
                options={{
                    title: "Consulta",
                    tabBarIcon: ({ color, size }) => <FontAwesome5 name="cat" size={size} color={color} />,
                }}
            />
        </Tabs>

    );
}