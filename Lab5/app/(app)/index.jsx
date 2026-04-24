import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { PRODUCTS } from '../../data/products';

export default function CatalogScreen() {
    const { logout } = useAuth();

    const renderProduct = ({ item }) => (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                    <Text style={styles.price}>{item.price}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={PRODUCTS}
                keyExtractor={(item) => item.id}
                renderItem={renderProduct}
                contentContainerStyle={{ padding: 15 }}
            />
            <View style={styles.footer}>
                <Button title="Вийти з акаунту" onPress={logout} color="#FF3B30" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    image: { width: 80, height: 80, resizeMode: 'contain', marginRight: 15 },
    info: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    price: { fontSize: 18, fontWeight: '600', color: '#007AFF' },
    footer: { padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' }
});