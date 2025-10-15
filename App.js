import React from "react";
import RootNavigator from "./src/screens/navigator/path";
import { Provider } from 'react-redux';
import { store } from '@/utils/store/store.js';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFB547" }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <RootNavigator />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}
