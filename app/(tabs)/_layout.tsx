//expo
import { Tabs } from 'expo-router';

//custom components, icons etc.
import TabIcon from '@/components/tabIcon';
import { icons } from '@/constants/icons';

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
          backgroundColor: '#0F0D23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
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
              icon={icons.home}
              title="Home"
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
              icon={icons.search}
              title="Search"
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
              icon={icons.save}
              title="Watchlist"
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
              icon={icons.person}
              title="Profile"
            />
          )
        }}
      />
    </Tabs>
  )
}