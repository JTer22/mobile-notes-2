import Feather from "@expo/vector-icons/Feather";
import IonIcon from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopWidth: 0,

          height: 100,
          paddingBottom: 20,
          paddingTop: 2,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: "hidden",
        },
        tabBarActiveTintColor: "#8B5CF6",
        tabBarInactiveTintColor: "#dcdee2",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="NotesList"
        options={{
          title: "Notes List",
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
