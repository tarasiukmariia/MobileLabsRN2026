import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

export default function ProfileScreen() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Реєстрація</Text>
        <Text style={styles.label}>Електронна пошта</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.label}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.label}>Прізвище</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Ім'я</Text>
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  screenTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 14, color: "#333", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
