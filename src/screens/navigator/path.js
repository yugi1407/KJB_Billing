import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Login from "@/screens/Login";
import Dashboard from "@/screens/Dashboard";
import MyOrders from "@/screens/MyOrders";
import Bill from "@/screens/Bill";
import HtmlView from "@/utils/ui/htmlView.js"; 
import Settings from "@/screens/Settings"; 

const Stack = createStackNavigator();

export default function Path() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token === "true") {
        setInitialRoute("Dashboard");
      } else {
        setInitialRoute("Login");
      }
    });
  }, []);

  if (!initialRoute) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="MyOrders" component={MyOrders} />
         <Stack.Screen name="Bill" component={Bill} /> 
          <Stack.Screen name="HtmlView" component={HtmlView} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
