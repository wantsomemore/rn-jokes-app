import {Tabs} from 'expo-router';
import React from 'react';

import TodayIcon from '@/assets/icons/Today';
import HistoryIcon from '@/assets/icons/History';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9763FF',
        tabBarStyle: {display: 'flex', alignItems: 'center', paddingVertical: 5},
        tabBarItemStyle: {marginHorizontal: 20},
        tabBarLabelStyle: {fontSize: 12, lineHeight: 16},
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Today',
          tabBarIcon: ({focused}) => <TodayIcon color={focused ? '#9763FF' : '#C1C3C6'} />,
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: 'History',
          tabBarIcon: ({focused}) => <HistoryIcon color={focused ? '#9763FF' : '#C1C3C6'} />,
        }}
      />
    </Tabs>
  );
}
