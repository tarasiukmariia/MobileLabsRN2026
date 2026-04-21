import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NewsScreen from "./screens/NewsScreen";

const Tab = createBottomTabNavigator();

const CustomHeader = () => (
  <View style={styles.headerContainer}>
    <Image
      source={require("./assets/ztu.png")}
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.headerTitle}>FirstMobileApp</Text>
  </View>
);

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Головна")
                iconName = focused ? "home" : "home-outline";
              else if (route.name === "Фотогалерея")
                iconName = focused ? "images" : "images-outline";
              else if (route.name === "Профіль")
                iconName = focused ? "person" : "person-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Головна" component={NewsScreen} />
        </Tab.Navigator>
      </NavigationContainer>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Тарасюк Марія Олександрівна, ВТ-22-1
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  logo: { width: 100, height: 40 },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  footer: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerText: { fontSize: 12, fontStyle: "italic", color: "#666" },
});
