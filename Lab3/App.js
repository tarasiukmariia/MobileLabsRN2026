import "react-native-gesture-handler";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme, darkTheme } from "./src/theme/theme";
import PlayScreen from "./src/screens/PlayScreen";
import ChallengesScreen from "./src/screens/ChallengesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={currentTheme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Гра")
                  iconName = focused ? "play-circle" : "play-circle-outline";
                else if (route.name === "Завдання")
                  iconName = focused ? "list" : "list-outline";
                else if (route.name === "Налаштування")
                  iconName = focused ? "settings" : "settings-outline";
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: currentTheme.primary,
              tabBarInactiveTintColor: currentTheme.textSecondary,
              tabBarStyle: {
                backgroundColor: currentTheme.surface,
                borderTopColor: currentTheme.border,
              },
              headerStyle: {
                backgroundColor: currentTheme.surface,
                shadowColor: "transparent",
                elevation: 0,
              },
              headerTintColor: currentTheme.text,
            })}
          >
            <Tab.Screen name="Гра" component={PlayScreen} />
            <Tab.Screen name="Завдання" component={ChallengesScreen} />
            <Tab.Screen name="Налаштування">
              {() => (
                <SettingsScreen
                  toggleTheme={toggleTheme}
                  isDarkMode={isDarkMode}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
