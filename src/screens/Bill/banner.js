import { Text, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@/hooks';
import LinearGradient from 'react-native-linear-gradient';

export default function banner({ value }) {
    const { Colors, Layout, Fonts } = useTheme();
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const bannerHeight = height * 0.06

    return (
        <View>
            <LinearGradient
                colors={['#FFB547', '#412879']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[{ padding: 2, borderRadius: 12, width: '100%' }]}
            >
                <View
                    style={[
                        Layout.rowHCenter,
                        Layout.justifyContentBetween,
                        {
                            backgroundColor: Colors.white,
                            borderRadius: 10,
                            height: bannerHeight,
                            paddingHorizontal: 12,
                        },
                    ]}
                >
                    <Text allowFontScaling={false} style={[Fonts.semibold, { fontSize: 15, color: Colors.text }]}>
                        Grand Total:
                    </Text>
                    <Text allowFontScaling={false} style={[Fonts.semibold, { fontSize: 15, color: Colors.text }]}>
                        <Text style={[Fonts.bold]}>₹</Text>{value}
                    </Text>
                </View>
            </LinearGradient>

        </View>
    )
}
