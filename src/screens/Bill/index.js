import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, ScrollView, Platform, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import GradientText from '@/utils/ui/Gradient.js';
import RNPrint from 'react-native-print';
import Input from "@/utils/ui/input";
import { useTheme } from "@/hooks";
import { getHtmlContent } from './html';
import Header from "@/utils/ui/Header";
import Banner from './banner';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Bill = () => {
  const navigation = useNavigation();
  const { Layout, Gutters, Colors, Fonts, Images } = useTheme();
  const selectedProducts = useSelector(state => state.order.selectedProducts) || [];
  const { width, height } = Dimensions.get('window');

  const [username, setUsername] = useState('');
  const [coupon, setCoupon] = useState({ code: '', discount: 0, error: '' });
  const gstPercent = 5;
  const date = format(new Date(), "EEEE, MMMM d 'at' hh:mm a");

  const subtotal = selectedProducts.reduce((sum, p) => sum + p.count * p.amount, 0);
  const discounted = subtotal - coupon.discount;
  const gstAmount = (discounted * gstPercent) / 100;
  const finalAmount = discounted + gstAmount;

  useEffect(() => {
    const fetchUsername = async () => {
      const user = await AsyncStorage.getItem('username');
      setUsername(user || 'Guest');
    };
    fetchUsername();
  }, []);

  const applyCoupon = () => {
    let discountValue = 0;
    let errorMsg = '';
    if (coupon.code === '#Tiger10') {
      discountValue = subtotal * 0.1;
      ToastAndroid.show('Coupon applied successfully!', ToastAndroid.SHORT);
    } else if (coupon.code === 'flat50') {
      discountValue = 50;
      ToastAndroid.show('Coupon applied successfully!', ToastAndroid.SHORT);
    } else {
      errorMsg = 'Invalid coupon code';
      ToastAndroid.show('Invalid coupon code', ToastAndroid.SHORT);
    }
    setCoupon({ ...coupon, discount: discountValue, error: errorMsg });
  };

  const openPdfView = async () => {
    try {
      const html = getHtmlContent(date, username, selectedProducts, subtotal, coupon.discount, gstPercent, gstAmount, finalAmount);
      await RNPrint.print({ html });
    } catch (error) {
      console.error('Print error:', error);
    }
  };

  const BillRow = ({ label, value, fontSize = 14, boldValue = true }) => (
    <View style={[Layout.row, Gutters.defTMargin, Layout.justifyContentBetween]}>
      <Text style={[Fonts.fw600, { color: Colors.text, fontSize }]}>{label}</Text>
      <Text style={[Fonts.fw600, { color: Colors.text, fontSize }]}>
        {boldValue && <Text style={[Fonts.bold]}>₹ </Text>}
        {value}
      </Text>
    </View>
  );

  const DottedLine = ({ color = '#000', style, dotWidth = 4, dotSpacing = 4 }) => {
    const totalDots = Math.floor((width - 20) / (dotWidth + dotSpacing));
    return (
      <View style={[Layout.row, { flexWrap: 'nowrap' }, style]}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <View key={i} style={{ width: dotWidth, height: 1, backgroundColor: color, marginRight: dotSpacing }} />
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={[Layout.fill]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header headerName="Billing" />
      <ScrollView style={[Layout.fill, { backgroundColor: Colors.white }]} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={[Layout.center, { backgroundColor: Colors.secondary }]}>
          <Image source={Images.screens.billbg} style={{ width: width * 0.6, height: height * 0.2, resizeMode: "contain" }} />
          <GradientText
            text="Your feast is on the way!"
            fontSize={22}
            gradientColors={['#e4e9f6ff', '#f9e8e8ff']}
            svgHeight={40}
            fontFamily={Fonts.semibold.fontFamily}
          />
        </View>

        <View style={{ backgroundColor: '#e9e0c4ff' }}>
          <Text style={[Fonts.tiny, Fonts.fw600, Fonts.center, { color: Colors.white }]}>
            How was your experience ? ☹
          </Text>
        </View>

        <View style={[Gutters.defHPadding]}>
          <Text style={[Fonts.tiny, Fonts.semibold, Layout.center, Gutters.smallTMargin, { color: Colors.text, fontSize: 20 }]}>
            Invoice
          </Text>
          <Text style={[Fonts.fw600, Layout.center, { color: Colors.text, fontSize: 13 }]}>{date}</Text>

          <View style={{ alignItems: 'center' }}>
            <Text style={[Fonts.tiny, Gutters.lmicroHPadding, Gutters.microVPadding, Gutters.smallBRadius, Fonts.fw600, { backgroundColor: "#fffaf3ff", color: Colors.secondary }]}>
              Staff: {username}
            </Text>
          </View>

          <View style={[Gutters.defTMargin]}>
            {selectedProducts.map((p, i) => (
              <View key={i}>
                <View style={[Layout.row, Gutters.microVMargin, Layout.justifyContentBetween]}>
                  <View style={[Layout.col]}>
                    <Text style={[Fonts.fw600, Layout.center, { color: Colors.text, fontSize: 14 }]}>{p.product_name}</Text>
                    <Text style={[Fonts.fw600, { color: Colors.text, fontSize: 14 }]}>{p.count} × {p.amount}</Text>
                  </View>
                  <Text style={[Fonts.fw600, { color: Colors.text, fontSize: 14 }]}>
                    <Text style={[Fonts.bold, { color: Colors.text, fontSize: 14 }]}>₹</Text>{p.count * p.amount}
                  </Text>
                </View>
                <DottedLine color={Colors.text + '60'} style={{ marginVertical: 4 }} />
              </View>
            ))}
          </View>

          <BillRow label="Subtotal:" value={subtotal.toFixed(2)} fontSize={16} />

          <View style={[Layout.row, Layout.fill, Layout.center, { marginTop: 10 }]}>
            <Input
              placeholder="Enter Coupon Code"
              value={coupon.code}
              onChangeText={text => setCoupon({ ...coupon, code: text, error: '' })}
              showError={!!coupon.error}
              errorMessage={coupon.error}
              width="80%"
            />
            <TouchableOpacity
              style={[Gutters.ltinyVPadding, Layout.center, Gutters.ltinyHPadding, Gutters.sregularBMargin, Gutters.mmicroBRadius, { backgroundColor: Colors.secondary, marginLeft: 10 }]}
              onPress={applyCoupon}
            >
              <Text style={[Fonts.fw600, { color: Colors.white, fontSize: 14 }]}>Apply</Text>
            </TouchableOpacity>
          </View>

          <BillRow label="Discount:" value={coupon.discount.toFixed(2)} />
          <BillRow label={`GST (${gstPercent}%)`} value={gstAmount.toFixed(2)} />

          <View style={[Gutters.regularVMargin]}>
            <Banner value={finalAmount.toFixed(2)} />
          </View>
        </View>
      </ScrollView>

      <View style={[Gutters.defLPadding, Gutters.defRPadding, { backgroundColor: Colors.white }]}>
        <TouchableOpacity style={[Gutters.tinyPadding, Gutters.microBRadius, { backgroundColor: Colors.primary }]} onPress={openPdfView}>
          <Text style={[Fonts.tiny, Fonts.fw600, Fonts.center, { color: Colors.white }]}>Generate Bill</Text>
        </TouchableOpacity>
        <Text style={[Fonts.fw600, Gutters.microTMargin, Layout.center, Gutters.mmicroVPadding, { color: Colors.text, fontSize: 14 }]}>
          Thanks for your order
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Bill;
