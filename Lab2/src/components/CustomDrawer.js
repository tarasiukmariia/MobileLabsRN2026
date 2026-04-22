import { View, Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawer(props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.profileContainer, { paddingTop: insets.top + 20 }]}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4140/4140047.png",
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Тарасюк Марія Олександрівна</Text>
        <Text style={styles.group}>ВТ-22-1</Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
      >
        <View style={styles.menuItems}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  group: { fontSize: 14, color: "#666", marginTop: 5 },
  menuItems: { flex: 1, paddingTop: 10 },
});
