import { View, Text, BackHandler, Pressable } from 'react-native';
import React, { useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation  } from '@react-navigation/native';
import { useTheme } from "@/hooks";

export default function Header({ headerName, backicon = true, home = true, onPress, iconcolor, iconName }) {
    const { Colors, Fonts, Layout, Gutters } = useTheme();
    const navigation = useNavigation();

    const handleBackPress = useCallback(() => {
        if (onPress && typeof onPress === 'function') {
            onPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        }
        return true;
    }, [onPress, navigation]);

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                handleBackPress
            );
            return () => backHandler.remove();
        }, [handleBackPress])
    );

    return (
        <View style={{ backgroundColor: Colors.secondary }}>
            <View
                style={[
                    Layout.top0,
                    Layout.bottom0,
                    Layout.right0,
                    Layout.left0,
                    Gutters.tinyLPadding,
                    Gutters.tinyRPadding,
                    Gutters.defPadding,
                ]}
            >
                <View style={[Layout.row]}>
                    {backicon ? (
                        <View style={{ flex: 2 }}>
                            <Pressable
                                hitSlop={{ top: 13, bottom: 13, right: 13, left: 13 }}
                                style={[Fonts.Left]}
                                onPress={handleBackPress}
                            >
                                <Ionicons
                                    name="arrow-back-sharp"
                                    size={22}
                                    color={iconcolor || Colors.text}
                                />
                            </Pressable>
                        </View>) : (<View style={{ flex: 2 }} />)}

                    <View style={[{ flex: 12 }]}>
                        <Text style={[Fonts.center, Fonts.small, Fonts.fw500, {color:Colors.text}]}>
                            {headerName}
                        </Text>
                    </View>

                    <View style={{ flex: 2, alignItems: 'flex-end' }}>
                        <Ionicons
                            style={[Fonts.right]}
                            name={home ? 'home-outline' : iconName}
                            size={22}
                            color={iconcolor || Colors.text}
                            onPress={() =>
                                navigation.navigate('Dashboard')
                            }
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}
