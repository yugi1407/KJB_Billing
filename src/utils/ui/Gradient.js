import React from 'react';
import Svg, { Defs, Stop, Text as SvgText, LinearGradient as SvgGradient, } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { useTheme } from 'src/hooks';

const { width } = Dimensions.get('window');

const directions = {
  leftToRight: { x1: '0', y1: '0', x2: '1', y2: '0' },
  topToBottom: { x1: '0', y1: '0', x2: '0', y2: '1' },
  rightToLeft: { x1: '1', y1: '0', x2: '0', y2: '0' },
  bottomToTop: { x1: '0', y1: '1', x2: '0', y2: '0' },
  diagonalTLBR: { x1: '0', y1: '0', x2: '1', y2: '1' },
  diagonalBRTL: { x1: '1', y1: '1', x2: '0', y2: '0' },
};

const GradientText = ({
  text = '',
  fontSize = 25,
  fontFamily,
  gradientId = 'grad',
  gradientColors = ['#7474B9', '#FB40B7'],
  x = width / 2,
  y = fontSize,
  textAnchor = 'middle',
  svgHeight = 40,
  svgWidth = width,
  style = {},
  gradientDirection = 'leftToRight',
  customGradient,
}) => {
  const { Fonts } = useTheme();

  const { x1, y1, x2, y2 } = customGradient || directions[gradientDirection];

  return (
    <Svg height={svgHeight} width={svgWidth} style={style}>
      <Defs>
        <SvgGradient id={gradientId} x1={x1} y1={y1} x2={x2} y2={y2}>
          <Stop offset="0" stopColor={gradientColors[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={gradientColors[1]} stopOpacity="1" />
        </SvgGradient>
      </Defs>
      <SvgText
        fill={`url(#${gradientId})`}
        fontSize={fontSize}
        fontFamily={fontFamily || Fonts.semibold.fontFamily}
        x={x}
        y={y}
        textAnchor={textAnchor}
      >
        {text}
      </SvgText>
    </Svg>
  );
};

export default GradientText;