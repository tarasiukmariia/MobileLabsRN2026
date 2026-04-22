import "react-native-gesture-handler"; 
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack"; 
import NewsScreen from "./src/screens/NewsScreen";
import NewsDetailsScreen from "./src/screens/NewsDetailsScreen";
import ContactsScreen from "./src/screens/ContactsScreen";
import CustomDrawer from "./src/components/CustomDrawer";

const Stack = createStackNavigator(); 
const Drawer = createDrawerNavigator();

function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsList" 
        component={NewsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NewsDetails" 
        component={NewsDetailsScreen} 
        options={({ route }) => ({
          title: route.params?.title || "Деталі",
          headerBackTitleVisible: false,
        })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{ headerTintColor: "#000", drawerActiveTintColor: "#007AFF" }}
        >
          <Drawer.Screen 
            name="NewsDrawer" 
            component={NewsStack} 
            options={{ title: "Новини", drawerLabel: "Новини" }} 
          />
          <Drawer.Screen 
            name="ContactsDrawer" 
            component={ContactsScreen} 
            options={{ title: "Контакти", drawerLabel: "Контакти" }} 
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}