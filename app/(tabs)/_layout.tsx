import { Tabs } from 'expo-router';

import { Image, ImageBackground, Text, View } from 'react-native';

import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

const TabIcon = ({ focused, icon, title }: any) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
      >
        <Image source={icon} tintColor="#151312" className='size-5' />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5' />
      </View>
    )
  }
}

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
          overflow: 'hidden'
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