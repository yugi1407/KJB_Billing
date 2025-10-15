import React from "react";
import { View, TextInput, Text } from "react-native";
import { useTheme } from "@/hooks";

export default function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  showError = false,
  errorMessage = "",
  width,
}) {
  const { Colors, Fonts, Gutters, Layout } = useTheme();
  return (
    <View style={[Gutters.ltinyBMargin]}>
      <View style={[Layout.row, Layout.alignItemsCenter, Gutters.mmicroBMargin, Gutters.microBRadius, Gutters.microVPadding, {
        backgroundColor: "#FFF", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2,
      }]}>
        <TextInput
          style={[{ width: width || '100%', }, Gutters.smallLPadding, Fonts.ltiny,
          { color: Colors.text, backgroundColor: Colors.white },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#999"
        />
      </View>

      <View style={{ height: showError ? 15 : 15, overflow: 'hidden' }}>
        {showError && (
          <Text style={{ color: 'red', fontSize: 10, marginLeft: 6, marginTop: 1 }}>
            {errorMessage}
          </Text>
        )}
      </View>
    </View>
  );
}

