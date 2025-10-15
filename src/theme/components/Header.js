import { StyleSheet } from 'react-native';
export default function ({ Colors, Gutters, Layout }) {
    const base = {
        ...Layout.center,
        ...Gutters.regularHPadding,
        height: 200,
        backgroundColor: Colors.primary,
    };
    return StyleSheet.create({
        base,
    });
}
