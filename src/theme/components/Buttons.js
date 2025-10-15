import { StyleSheet } from 'react-native';
export default function ({ Colors, Gutters, Layout }) {
    const base = {
        ...Layout.center,
        ...Gutters.regularHPadding,
        height: 50,
        backgroundColor: Colors.primary,
    };
    const rounded = {
        ...base,
        borderRadius: 50,
    };
    const circle = {
        ...Layout.center,
        height: 70,
        width: 70,
        borderRadius: 35,
        backgroundColor: Colors.circleButtonBackground,
        color: Colors.circleButtonColor,
        fill: Colors.circleButtonColor,
    };

    const btngreen = {
        ...Gutters.defPadding,
        backgroundColor: Colors.secondary,
        ...Gutters.microBRadius,
        ...Gutters.defMargin,

    };
    
    const disabledbtn = {
        ...Gutters.defPadding,
        backgroundColor:'#D1F7C4',
        ...Gutters.microBRadius,
        ...Gutters.defMargin,
    }

    const dottedbtn = {
        ...Gutters.largeBRadius,
        ...Gutters.tinyPadding,
        borderColor: Colors.white,
        borderWidth: 0.8,
        backgroundColor: '#0BC568',


    };


    return StyleSheet.create({
        base,
        rounded,
        circle,
        btngreen,
        dottedbtn,
        disabledbtn,
        outline: {
            ...base,
            backgroundColor: Colors.transparent,
            borderWidth: 2,
            borderColor: Colors.primary,
        },
        outlineRounded: {
            ...rounded,
            backgroundColor: Colors.transparent,
            borderWidth: 2,
            borderColor: Colors.primary,
        },
    });
}
