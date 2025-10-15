import { StyleSheet,Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardSize = (screenWidth - 4 * 15) / 4;

export default function ({ }) {
  return StyleSheet.create({

    /* Column Layouts */
    col: {
      flexDirection: 'column',
    },
    colReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },

    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentEven: {
      justifyContent: "space-evenly",
    },
    justifyEnd: {
      justifyContent: 'flex-end'
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfCenter: {
      alignSelf: 'center',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    absoluteFill: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },

    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    halfWidth: {
      width: '50%',
    },
    fullHeight: {
      height: '100%',
    },
    halfHeight: {
      height: '50%',
    },
    screenWidth: {
      width:cardSize,
      height:cardSize
    },

    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: '90deg' }],
    },
    rotate90Inverse: {
      transform: [{ rotate: '-90deg' }],
    },

    // Position
    relative: {
      position: 'relative',
    },
    absolute: {
      position: 'absolute',
    },
    topBar: {
      top: 22,
    },
    top0: {
      top: 0,
    },
    bottom0: {
      bottom: 0,
    },
    left0: {
      left: 0,
    },
    right0: {
      right: 0,
    },
    topImg: {
      alignSelf: 'center',
      position: 'absolute',
      top: 20,
    },
    padding0: {
      padding: 0,
    },
    margin0: {
      margin: 0,
    },
    marginl0: {
      marginLeft: 0,
    },
    marginr0: {
      marginRight: 0,
    },
    margint0: {
      marginTop: 0,
    },
    marginb0: {
      marginBottom: 0,
    },

    // overflow
    noOverflow: {
      overflow: 'hidden'
    },

    shadow: ({ color = "black", opacity = 1, offset = { width: 1, height: 2 }, radius = 10, zIndex = 10 }) => {
      return {
        //        shadowOpacity: opacity,
        shadowOffset: offset,
        shadowRadius: radius,
        elevation: zIndex,
        zIndex: zIndex,
        shadowColor: color,
      };
    }


  });
}
