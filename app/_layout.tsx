import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'goals': // Goals screen
              iconName = 'flag';
              break;
            case 'budget': // Budget screen
              iconName = 'wallet';
              break;
            case 'investments': // Investments screen
              iconName = 'stats-chart';
              break;
            default:
              iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2f95dc', // Active icon color
        tabBarInactiveTintColor: 'gray',  // Inactive icon color
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
        },
      })}
    >
      <Tabs.Screen name="goals" options={{ title: 'Goals' }} />
      <Tabs.Screen name="budget" options={{ title: 'Budget' }} />
      <Tabs.Screen name="investments" options={{ title: 'Investments' }} />
    </Tabs>
  );
}
