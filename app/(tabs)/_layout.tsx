//expo
import { Tabs } from 'expo-router';

//custom components, icons etc.
import TabIcon from '@/components/tabIcon';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#140f41',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 100,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderColor: ''
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? 'home' : 'home-outline'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? 'search' : 'search-outline'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: 'Watchlist',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? 'bookmark' : 'bookmark-outline'}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={focused ? 'person' : 'person-outline'}
            />
          )
        }}
      />
    </Tabs>
  )
}