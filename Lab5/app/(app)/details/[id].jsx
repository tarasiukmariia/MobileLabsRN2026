import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { PRODUCTS } from '../../../data/products';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const product = PRODUCTS.find((p) => p.id === id);

    if (!product) {
        return (
            <View style={styles.center}>
                <Text>Товар не знайдено</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.sectionTitle}>Опис:</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: 300, resizeMode: 'contain', backgroundColor: '#f9f9f9', padding: 20 },
    infoContainer: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    price: { fontSize: 24, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555' },
    description: { fontSize: 16, lineHeight: 24, color: '#444' }
});