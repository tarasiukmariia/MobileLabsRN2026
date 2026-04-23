import { View, Text, StyleSheet } from "react-native";

const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function MemoryStats({ stats }) {
  return (
    <View style={styles.statsContainer}>
      <Text style={styles.statsTitle}>Статистика пам'яті пристрою</Text>
      <Text style={styles.statsText}>Всього: {formatBytes(stats.total)}</Text>
      <Text style={styles.statsText}>
        Використано: {formatBytes(stats.used)}
      </Text>
      <Text style={styles.statsText}>Вільно: {formatBytes(stats.free)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  statsText: { fontSize: 14, color: "#555", marginTop: 2 },
});
