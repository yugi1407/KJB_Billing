import React, { useState } from "react";
import {View, Text, TouchableOpacity, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform} from "react-native";
import Input from "@/utils/ui/input";
import { isUsername, isPassword } from "src/utils/functions";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@/hooks";
import { USERS } from '@/utils/constants/users.js'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const { Colors, Fonts, Gutters, Layout, Images } = useTheme();
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });

  const handleUsername = (text) => {
    setUsername(text);
    setErrors((prev) => ({ ...prev, username: isUsername(text) }));
  };

  const handlePassword = (text) => {
    setPassword(text);
    setErrors((prev) => ({ ...prev, password: isPassword(text) }));
  };

  const handleLogin = async () => {
    const usernameError = isUsername(username);
    const passwordError = isPassword(password);

    if (usernameError || passwordError) {
      setErrors({ username: usernameError, password: passwordError, general: "" });
      return;
    }

    const user = USERS.find((u) => u.username === username && u.password === password);
    if (user) {
      try {
        await AsyncStorage.setItem("token", "true");
        await AsyncStorage.setItem("role", user.role);
        await AsyncStorage.setItem("username", user.username);
        setErrors({ username: "", password: "", general: "" });
        navigation.navigate("Dashboard");
      } catch (error) {
        console.log("AsyncStorage Error: ", error);
      }
    } else {
      setErrors({
        username: "",
        password: "",
        general: "Invalid username or password",
      });
    }
  };

  const isDisabled =
    !!errors.username || !!errors.password || username.length === 0 || password.length === 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#FFF8F3" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={[Gutters.defHPadding, { flexGrow: 1 }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flex: 1 }}>
          <View style={[Layout.center]}>
            <Image
              source={Images.screens.login}
              style={{ width: width * 0.8, height: height * 0.4, resizeMode: "contain" }}
            />
          </View>

          <Text style={[Fonts.tiny, Fonts.semibold, { color: Colors.text, fontSize: 20 }]}>
            Login and make,
          </Text>
          <Text style={[Fonts.tiny, Fonts.fw600, Gutters.defBMargin, { color: Colors.text }]}>
            every order delicious!
          </Text>

          <Input
            placeholder="Enter Username"
            value={username}
            onChangeText={handleUsername}
            showError={!!errors.username}
            errorMessage={errors.username}
          />

          <Input
            placeholder="Enter Password"
            value={password}
            onChangeText={handlePassword}
            showError={!!errors.password}
            errorMessage={errors.password}
            secureTextEntry
          />

          {errors.general ? (
            <Text style={{ color: "red", fontSize: 12, marginBottom: 8 }}>
              {errors.general}
            </Text>
          ) : null}

          <TouchableOpacity disabled={isDisabled} style={[Gutters.tinyPadding, Gutters.microBRadius, { backgroundColor: isDisabled ? "#f9bd8cff" : Colors.primary, width: "100%" }]} onPress={handleLogin}>
            <Text style={[Fonts.tiny, Fonts.fw600, Fonts.center, { color: Colors.white }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
