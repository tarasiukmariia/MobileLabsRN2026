import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export default function FileItem({ item, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Ionicons
        name={item.isDirectory ? "folder" : "document-text"}
        size={24}
        color={item.isDirectory ? "#FFD700" : "#007AFF"}
      />
      <Text style={styles.fileName}>{item.name}</Text>
      <Ionicons name="ellipsis-vertical" size={16} color="#ccc" style={{ marginLeft: "auto" }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  fileName: { 
    flex: 1, 
    fontSize: 16, 
    marginLeft: 15, 
    color: "#333" 
  },
});