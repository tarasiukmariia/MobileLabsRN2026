import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Ой!' }} />
            <Text style={styles.title}>Екран не знайдено (404)</Text>
            <Link href="/" style={styles.link}>
                Повернутися на головну
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    link: { fontSize: 16, color: '#007AFF', marginTop: 15, padding: 10 }
});