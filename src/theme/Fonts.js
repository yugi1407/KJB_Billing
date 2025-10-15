import { StyleSheet } from 'react-native';
export default function ({ FontSize, Colors }) {
  return StyleSheet.create({
    mmicro: {
      fontSize: FontSize.mmicro,
      color: Colors.textWhite,
      fontFamily: 'Poppins'
    },
    smicro: {
      fontSize: FontSize.smicro,
      color: Colors.textWhite,
      fontFamily: 'Poppins'
    },
    mdmicro: {
      fontSize: FontSize.mdmicro,
      fontFamily: 'Poppins'
    },
    micro: {
      fontSize: FontSize.micro,
      color: Colors.textWhite,
      fontFamily: 'Poppins'
    },
    lmicro: {
      fontSize: FontSize.lmicro,
    },
    microB: {
      fontSize: FontSize.micro,
      fontFamily: 'Poppins'
    },
    tiny: {
      fontSize: FontSize.tiny,
      fontFamily: 'Poppins'
    },
    ltiny: {
      fontSize: FontSize.ltiny,
      fontFamily: 'Poppins'
    },
    ssmall: {
      fontSize: FontSize.ssmall,
      fontFamily: 'Poppins'
    },
    small: {
      fontSize: FontSize.small,
      fontFamily: 'Poppins'
    },
    lsmall: {
      fontSize: FontSize.lsmall,
      fontFamily: 'Poppins'
    },
    regular: {
      fontSize: FontSize.regular,
      fontFamily: 'Poppins'
    },
    lregular: {
      fontSize: FontSize.lregular,
      fontFamily: 'Poppins'
    },
    medium: {
      fontSize: FontSize.medium,
      fontFamily: 'Poppins'
    },
    large: {
      fontSize: FontSize.large,
      fontFamily: 'Poppins'
    },
    slarge: {
      fontSize: FontSize.slarge,
      fontFamily: 'Poppins'
    },
    semibold: {
      fontFamily: 'Poppins-SemiBold'
    },
    italic: {
      fontFamily: 'Poppins-MediumItalic'
    },
    bold: {
      fontWeight: 'bold',
      fontFamily: 'Poppins-Bold'
    },
    fw500: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '500',
    },
    fw600: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '600',
    },
    fw700: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '700',
    },
    fw300: {
      fontFamily: 'Poppins-Regular',
      fontWeight: '300',
    },
    poppins: {
      fontFamily: 'Poppins'
    },
    uppercase: {
      textTransform: 'uppercase',
    },
    titleSmall: {
      fontSize: FontSize.small * 1.5,
      fontWeight: 'bold',
      color: Colors.textWhite,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.textWhite,
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.textWhite,
    },
    center: {
      textAlign: 'center',
    },
    justify: {
      textAlign: 'justify',
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },
  });
}
