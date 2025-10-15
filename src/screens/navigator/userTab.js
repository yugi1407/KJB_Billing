import React, { useState } from 'react';
import {View, Animated, StyleSheet, Easing, Pressable, Text, TouchableWithoutFeedback, Dimensions, BackHandler} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from "@/hooks";
import style from './style';
import LinearGradient from 'react-native-linear-gradient';  
import { useFocusEffect } from '@react-navigation/native';

export default function Footer({
  navigation,
  menuItems = [],
  addButtonText = null,
  footerTabs = false,   
}) {
  const { Colors, Fonts, Layout, Gutters } = useTheme();
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const [showMenu, setShowMenu] = useState(false);
  const [rotateValue] = useState(new Animated.Value(0));
  const [bgOpacity] = useState(new Animated.Value(0));

  const [iconAnimations] = useState(
    menuItems.map(() => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      scale: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (showMenu) {
          animateIconsOut();
          Animated.timing(rotateValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          return true;
        }
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => backHandler.remove();
    }, [showMenu, rotateValue])  
  );

  const toggleMenu = () => {
    Animated.timing(rotateValue, {
      toValue: showMenu ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (!showMenu) {
      animateIconsIn();
      setShowMenu(true);
    } else {
      animateIconsOut();
    }
  };

  const animateIconsIn = () => {
    Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    iconAnimations.forEach((animation, index) => {
      const { x, y } = calculatePosition(index, menuItems.length, footerTabs);
      Animated.parallel([
        Animated.timing(animation.translateX, {
          toValue: x,
          duration: 500,
          delay: index * 100,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(animation.translateY, {
          toValue: y,
          duration: 500,
          delay: index * 100,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.spring(animation.scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(animation.opacity, {
          toValue: 1,
          duration: 300,
          delay: index * 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const animateIconsOut = () => {
    iconAnimations.forEach((animation, index) => {
      Animated.parallel([
        Animated.timing(animation.translateX, {
          toValue: 0,
          duration: 300,
          delay: index * 20,
          useNativeDriver: true,
        }),
        Animated.timing(animation.translateY, {
          toValue: 0,
          duration: 300,
          delay: index * 20,
          useNativeDriver: true,
        }),
        Animated.timing(animation.scale, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(animation.opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });

    Animated.timing(bgOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowMenu(false);
    });
  };

  const calculatePosition = (index, totalItems, footerTabs) => {
    const radius = 100;

    if (footerTabs) {
      const startAngle = 210;
      const endAngle = 330;
      const step = (endAngle - startAngle) / (totalItems - 1 || 1);
      const angle = (startAngle + index * step) * (Math.PI / 180);
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    } else {
      const startAngle = 180;
      const endAngle = 280;
      const step = (endAngle - startAngle) / (totalItems - 1 || 1);
      const angle = (startAngle + index * step) * (Math.PI / 180);
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    }
  };

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={style.footerTop} key="1" pointerEvents="box-none">
      {showMenu && (
        <View style={[Layout.center]}>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <Animated.View
              pointerEvents={showMenu ? 'auto' : 'none'}
              style={{
                position: 'absolute',
                width: Width,
                height: Height,
                bottom: -1,
                opacity: bgOpacity,
                zIndex: 1,
              }}
            >
              <Pressable onPress={toggleMenu} style={StyleSheet.absoluteFill}>
                <LinearGradient
                  colors={['transparent', '#eec59cff']}
                  style={StyleSheet.absoluteFill}
                />
              </Pressable>
            </Animated.View>
          </TouchableWithoutFeedback>

          {menuItems.map((item, index) => {
            const animation = iconAnimations[index];
            if (!animation) return null;
            return (
              <Animated.View
                key={index}
                pointerEvents={showMenu ? 'auto' : 'none'}
                style={[
                  Layout.center,
                  Gutters.largeBRadius,
                  Layout.absolute,
                  Layout.noOverflow,
                  {
                    transform: [
                      { translateX: animation.translateX },
                      { translateY: animation.translateY },
                      { scale: animation.scale },
                    ],
                    opacity: animation.opacity,
                    width: 65,
                    height: 65,
                    backgroundColor: Colors.white,
                    bottom: 25,
                    right: 25,
                    zIndex: 2,
                    elevation: 2,
                  },
                ]}
              >
                <Ionicons name={item.icon} size={20} color={Colors.primary} />
                <Text
                  allowFontScaling={false}
                  numberOfLines={2}
                  style={[
                    Fonts.textblue,
                    Fonts.center,
                    Fonts.bold,
                    Gutters.smicroTMargin,
                    Gutters.smicroBMargin,
                    { fontSize: 10, width: '50%' },
                  ]}
                >
                  {item.label}
                </Text>
                <Pressable
                  android_ripple={{ color: Colors.lightblue, borderless: true }}
                  onPress={() => {
                    toggleMenu();
                    navigation.navigate(item.screen, item.params || {});
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                />
              </Animated.View>
            );
          })}
        </View>
      )}

      <View
        style={[{ bottom: 25, right: 25 }, { zIndex: 10, position: 'absolute' }]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            Layout.center,
            {
              bottom: 0,
              transform: [{ rotate: rotateInterpolation }],
            },
          ]}
        >
          <View style={{ borderRadius: 35 }}>
            <Pressable
              onPress={toggleMenu}
              style={{
                width: addButtonText ? 60 : 55,
                height: addButtonText ? 60 : 55,
                borderRadius: 35,
                backgroundColor: showMenu ? Colors.primary : Colors.text,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 9,
              }}
            >
              <Ionicons name="add-outline" size={30} color="#fff" />
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
