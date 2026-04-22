import { View, Text, StyleSheet } from 'react-native';

export default function NewsDetailsScreen({ route }) {
  const { title } = route.params || { title: 'Деталі' };
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Екран деталей новини: {title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, text: { fontSize: 18 }});