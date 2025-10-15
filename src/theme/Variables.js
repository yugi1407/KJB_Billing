import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define a base size and aspect ratio
const BASE_WIDTH = 375; // Base width for scaling (standard phone width)
const BASE_HEIGHT = 667; // Base height for scaling (standard phone height)

// Calculate scale factors based on both width and height
const widthScaleFactor = SCREEN_WIDTH / BASE_WIDTH;
const heightScaleFactor = SCREEN_HEIGHT / BASE_HEIGHT;

// Use the smaller of the two scale factors for consistency
const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor, 1); // Cap scaling to 1 (or adjust lower if needed)

// Scaling function
const scale = size => Math.round(size * scaleFactor);
export const Colors = {
  //Theme 
  primary: '#FC8019',
  altprimary: '#13379B',
  secondary: '#FFB547',
  primLight: '#F2EFFF',
  primLightDarker: '#DBE1FB',
  primMod: "#12369B",
  primMedium: '#313299',
  secLight: '#f2faf5',
  dot: '#d3d3d3',
  lightblue: '#F7FCFF',
  lightPink: '#F0D7ED',
  darkPink: '#A7479F',
  shadow: '#8383B6',
  lightOrange: '#FFE9E1',
  darkOrange: '#D07644',
  lightgrey: '#F3F4FF',
  grey: "#9e9e9e",
  lightshadow: '#F9F8FE',
  mediumshadow: '#FAFAFF',
  skyblue: '#E5F0FE',
  orange: '#E87E4C',
  mediumorange: '#ffebcd',
  mediumblue: '#D8D8F0',
  darkGreen: "#006600",
  pink: '#C50B4E',
  yellow: '#BDB718',
  darkshadow: '#3A5380',
  red: '#dc143c',
  lightred: '#EC3B5F',
  lightpink: '#FFF6F9',
  lightgreen: '#81FFC0',
  lightyellow: '#FFEB8114',
  lightred: '#EF5350',
  lightorange: '#EA9812B0',
  shadowblue: '#7474B9',
  shadowred: '#B70000',
  shadowlightblue: '#A0B1DF',
  shadowmediumblue: '#F0F5FF',
  black: "#000000",
  white: '#FFFFFF',

  //Typography
  textGray800: '#000000',
  textGray400: '#4D4D4D',
  textGray200: '#A1A1A1',
  textLink: '#2f7bcc',
  textWhite: '#FFFFFF',
  textgreen: '#0BC568',
  text: "#2C2C2C",
  //Form
  success: '#28a745',
  error: '#dc3545',

  //Header
  hButton: '#313299',

  //Common 
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',

};
export const NavigationColors = {
  primary: Colors.primary,
  background: '#FFFFFF',
  card: '#FFFFFF',
};

export const TouchableColors = {
  c1: { c: Colors.lightOrange, t: Colors.darkOrange },
  c2: { c: Colors.lightPink, t: Colors.darkPink },
  c3: { c: "#DFECFA", t: "#499EC3" },
  c4: { c: "#F0EAD2", t: "#C09E47" },
  c5: { c: "#FFDDD2", t: "#B45F5F" },
  c6: { c: "#CAF0F8", t: "#2E5093" },
  c7: { c: "#F2E9E4", t: "#A68C65" },
  c8: { c: "#C7F9CC", t: "#4A923F" },
  c9: { c: "#CDC1FF", t: "#8B54C3" },
  c10: { c: "#DFE7FD", t: "#556CA6" },
  c11: { c: "#D8F2E4", t: "#5D9678" },
  c12: { c: "#EEE4E1", t: "#87574C" },
  c13: { c: "#F5E9C9", t: "#888537" },
};

/**
 * FontSize
 */
export const FontSize = {
  mmicro: scale(4),
  smicro: scale(6),
  mdmicro: scale(8.5),
  micro: scale(10),
  lmicro: scale(11),
  tiny: scale(12),
  ltiny: scale(13),
  ssmall: scale(14),
  small: scale(16),
  lsmall: scale(18),
  regular: scale(20),
  lregular: scale(25),
  medium: scale(30),
  slarge: scale(35),
  large: scale(40),
};

/**
 * Metrics Sizes
 */
const smicro = scale(2);
const mmicro = scale(3);
const micro = scale(5);
const lmicro = scale(8);
const tiny = scale(10);
const ltiny = scale(12);
const def = scale(15);
const lsmall = scale(17);
const small = scale(20); // 20
const sregular = scale(25);
const regular = scale(30); // 30
const lregular = scale(33);
const slarge = scale(40);
const large = scale(60); // 60
const llarge = scale(68);

export const MetricsSizes = {
  smicro,
  mmicro,
  micro,
  lmicro,
  tiny,
  ltiny,
  def,
  small,
  lsmall,
  sregular,
  regular,
  lregular,
  slarge,
  large,
  llarge,
};



export default {
  Colors,
  NavigationColors,
  TouchableColors,
  FontSize,
  MetricsSizes,

};
