import React, { useState } from "react";
import { View, TouchableOpacity, Pressable, Text, StyleSheet } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "@/hooks";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import CustomConfirmModal from "./logout";
import Header from "@/utils/ui/Header";

export default function Settings() {
  const { Colors, Fonts, Gutters, Layout } = useTheme();
  const navigation = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    setIsAlertVisible(false);
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View style={[Layout.fill]}>
      <Header headerName="Settings"/>
      <Pressable
        style={[Layout.rowHCenter, Gutters.defHPadding, Gutters.defBPadding, Gutters.defTPadding, {
          borderBottomWidth: 0.7, borderStyle: 'dotted', borderColor: '#C5D2F8',
        }]}
        android_ripple={{ color: Colors.lightblue, borderLess: true }}
        onPress={() => setIsAlertVisible(true)}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={[Gutters.regularBRadius, Layout.center, Gutters.tinyPadding]}
        >
          <MaterialCommunityIcons name="logout" size={20} color={'white'} />
        </LinearGradient>
        <View style={[Gutters.defLPadding, Layout.fill]}>
          <Text style={[Fonts.ssmall, Fonts.textblue, Fonts.fw600]}>
            Logout
          </Text>
          <Text style={[Fonts.micro, { color: Colors.text }]}>click to logout</Text>
        </View>
        <Icon name="keyboard-arrow-right" size={14} color={Colors.shadowblue} />
      </Pressable>

      <CustomConfirmModal
        visible={isAlertVisible}
        message="Are you sure you want to logout?"
        title="Logout"
        onConfirm={handleLogout}
        onCancel={() => setIsAlertVisible(false)}
        iconName="logout"
      />
    </View>
  );
}

