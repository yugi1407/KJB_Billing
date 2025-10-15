import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { useTheme } from "@/hooks";
import LinearGradient from 'react-native-linear-gradient';
import Header from "@/utils/ui/Header";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useInitialProducts } from '@/utils/constants/product.js';
import { useDispatch } from 'react-redux';
import { setSelectedProducts } from '@/utils/store/orderSlice.js';

const Orders = () => {
    const { Layout, Gutters, Colors, Fonts} = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { width } = Dimensions.get('window');
    const initialProducts = useInitialProducts();
    const [products, setProducts] = useState(initialProducts);
    const [totalCount, setTotalCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const handleIncrement = (index) => {
        const updated = products.map((item, i) => {
            if (i === index) {
                return { ...item, count: (item.count || 0) + 1 };
            }
            return item;
        });
        updateTotals(updated);
    };


    const handleDecrement = (index) => {
        const updated = products.map((item, i) => {
            if (i === index) {
                return { ...item, count: Math.max(0, item.count - 1) };
            }
            return item;
        });
        updateTotals(updated);
    };


    const updateTotals = (updated) => {
        setProducts(updated);
        let count = 0, amount = 0;
        updated.forEach(p => {
            count += p.count;
            amount += p.count * p.amount;
        });
        setTotalCount(count);
        setTotalAmount(amount);
    };

    const handleNext = () => {
        const selected = products.filter(p => p.count > 0);
        if (selected.length === 0) return alert('Please select at least one product.');
        dispatch(setSelectedProducts(selected));
        navigation.navigate('Bill');
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === '') {
            setProducts(initialProducts);
        } else {
            const filteredProducts = initialProducts.filter((product) =>
                product.product_name.toLowerCase().includes(query.toLowerCase())
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <View style={[Layout.fill, { backgroundColor: '#FFF8F3' }]}>
            <Header headerName="My Orders" />
            <View style={[Layout.justifyContentCenter, Gutters.lmicroPadding, Gutters.tinyBRadius, Gutters.tinyTMargin, Gutters.tinyBMargin, Gutters.tinyHMargin, { backgroundColor: Colors.white, width: "95%", maxHeight: 54, borderColor: Colors.primary, borderWidth: 0.9 }]}>
                <View style={[Layout.rowHCenter, Layout.justifyContentBetween]}>
                    <TextInput
                        style={[Fonts.tiny, { color: Colors.text, width: '95%', left: 5 }]}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    <Icon name="search" size={18} style={{ right: 10 }} color={Colors.shadowblue} />
                </View>
            </View>

            <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}>
                {products.map((p, i) => (
                    <LinearGradient
                        key={p.product_id || i}
                        colors={['#fde0c8ff', '#f5eae0ff']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={[{ width: width * 0.94, opacity: 1 },
                        Gutters.tinyPadding, Gutters.lmicroMargin, Gutters.defBRadius, Layout.center,
                        ]}
                    >
                        <View style={[Layout.row, Layout.fill]}>
                            <View style={{ flex: 4 }}>
                                <Image
                                    source={p.product_photo}
                                    style={[Gutters.tinyBRadius, { width: width * 0.31, height: (width * 0.37) * 0.78, overflow: 'hidden' }]}
                                />
                            </View>

                            <View style={[Layout.col, { flex: 7 }]}>
                                <View style={[Layout.row, Layout.justifyContentBetween, Gutters.defTMargin]}>
                                    <Text style={[Fonts.small, Fonts.semibold, { color: Colors.text, flexShrink: 1 }]}>{p.product_name}</Text>
                                    <View style={[Layout.rowHCenter]}>
                                        <Text style={[Fonts.lmicro, Fonts.fw600, Gutters.microRMargin]}>{p.rating}</Text>
                                        <Icon name="star" size={10} color="#FFC433" />
                                    </View>
                                </View>

                                <View style={[Layout.fill, Layout.row, Layout.center, Gutters.tinyBMargin]}>
                                    <View style={[Layout.col, { flex: 7 }]}>
                                        <Text style={[Fonts.ltiny, Fonts.fw600]}>{p.sub}</Text>
                                        <Text style={[Fonts.ltiny, Fonts.fw600]}>
                                            <Text style={[Fonts.textblue, Fonts.ltiny]}>₹ </Text>{p.amount}
                                        </Text>
                                    </View>

                                    <View style={[Layout.alignItemsEnd, { flex: 1 }]}>
                                        <View style={[Layout.row, Layout.alignItemsCenter]}>
                                            <TouchableOpacity style={[Layout.center, Gutters.smallBRadius, Gutters.microHMargin, { width: 30, height: 30, backgroundColor: '#d49703' }]} onPress={() => handleDecrement(i)}>
                                                <Icon name="minus" size={13} color={Colors.white} />
                                            </TouchableOpacity>
                                            <Text style={[Fonts.small, Fonts.semibold, Gutters.microHMargin, { color: Colors.text }]}>{p.count}</Text>
                                            <TouchableOpacity style={[Layout.center, Gutters.smallBRadius, Gutters.microHMargin, { width: 30, height: 30, backgroundColor: '#d49703' }]} onPress={() => handleIncrement(i)}>
                                                <Icon name="plus" size={13} color={Colors.white} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </LinearGradient>
                ))}
            </ScrollView>

            {totalCount > 0 && (
                <View style={[Gutters.defBRadius, Layout.row, Gutters.defPadding, Layout.justifyContentBetween, { width: '95%', backgroundColor: '#b88200', position: 'absolute', bottom: 10, left: 10 }]}>
                    <View style={[Layout.col]}>
                        <Text style={[Fonts.ssmall, Fonts.semibold, { color: Colors.white }]}>Count : {totalCount}</Text>
                        <Text style={[Fonts.ssmall, Fonts.semibold, { color: Colors.white }]}>Total Amount : <Text style={[Fonts.bold]}>₹ </Text>{totalAmount}</Text>
                    </View>
                    <View style={[Layout.row]}>
                        <TouchableOpacity style={[Gutters.tinyPadding, Gutters.tinyBRadius, Layout.row, Layout.center, { backgroundColor: Colors.secondary }]} onPress={handleNext}>
                            <Icon name="shopping-cart" size={19} color={Colors.text} />
                            <Text style={[Fonts.ssmall, Fonts.semibold, Gutters.tinyLPadding, { color: Colors.text }]}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Orders;
