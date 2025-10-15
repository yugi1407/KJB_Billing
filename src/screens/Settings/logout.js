import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "@/hooks";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomConfirmModal({
  visible,
  message = "Are you sure?",
  title = "Confirmation",
  onConfirm,
  onCancel,
  iconName = "alert-circle-outline",
  yesBgColor = "#FC8019",
  noBgColor = "#ccc",
  customIcon = null,
}) {
  const { Colors, Fonts, Gutters, Layout } = useTheme();
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={[Layout.fill, Layout.center, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
        <View style={[Gutters.defBRadius, Layout.alignItemsCenter, Gutters.defPadding, {
          width: "80%", backgroundColor: "#fff", position: 'relative',
        }]}>
          {customIcon ? (
            customIcon
          ) : (
            <MaterialCommunityIcons
              name={iconName}
              size={35}
              color="#FF3B30"
              style={{ marginBottom: 10 }}
            />
          )}

          <Text style={[Fonts.tiny, Fonts.semibold, { color: Colors.text, fontSize: 15 }]}>{title}</Text>
          <Text style={[Fonts.tiny, Fonts.fw600, Gutters.tinyVMargin, { color: Colors.text }]}>{message}</Text>

          <View style={[Layout.row]}>
            {onCancel && (
              <TouchableOpacity
                style={[Layout.fill, Gutters.tinyVPadding, Layout.center, Gutters.tinyBRadius, Gutters.microHMargin, { backgroundColor: noBgColor }]}
                onPress={onCancel}
              >
                <Text style={[Fonts.tiny, Fonts.fw600, Fonts.ssmall, { color: Colors.white }]}>Cancel</Text>
              </TouchableOpacity>
            )}

            {onConfirm && (
              <TouchableOpacity
                style={[Layout.fill, Gutters.tinyVPadding, Layout.center, Gutters.tinyBRadius, Gutters.microHMargin, { backgroundColor: yesBgColor }]}
                onPress={onConfirm}
              >
                <Text style={[Fonts.tiny, Fonts.fw600, Fonts.ssmall, { color: Colors.white }]}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

