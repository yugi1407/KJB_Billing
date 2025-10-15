import { StyleSheet } from 'react-native';
export default function ({ MetricsSizes }) {
    return StyleSheet.create(Object.entries(MetricsSizes).reduce((acc, [key, value]) => ({
        ...acc,
        /* Margins */
        [`${key}Margin`]: {
            margin: value,
        },
        [`${key}BMargin`]: {
            marginBottom: value,
        },
        [`${key}NBMargin`]: {
        marginBottom: -value,
        },
        [`${key}TMargin`]: {
            marginTop: value,
        },
        [`${key}NTMargin`]: {
            marginTop: -value,
        },      
        [`${key}RMargin`]: {
            marginRight: value,
        },
        [`${key}LMargin`]: {
            marginLeft: value,
        },
        [`${key}VMargin`]: {
            marginVertical: value,
        },
        [`${key}HMargin`]: {
            marginHorizontal: value,
        },
        /* Paddings */
        [`${key}Padding`]: {
            padding: value,
        },
        [`${key}BPadding`]: {
            paddingBottom: value,
        },
        [`${key}TPadding`]: {
            paddingTop: value,
        },
        [`${key}RPadding`]: {
            paddingRight: value,
        },
        [`${key}LPadding`]: {
            paddingLeft: value,
        },
        [`${key}VPadding`]: {
            paddingVertical: value,
        },
        [`${key}HPadding`]: {
            paddingHorizontal: value,
        },

        /* Radius */

        [`${key}BRadius`]: {
            borderRadius: value,
        },
        [`${key}TRadius`]: {
            borderTopRadius: value,
        },
        [`${key}TLRadius`]: {
            borderTopLeftRadius: value,
        },
        [`${key}TRRadius`]: {
            borderTopRightRadius: value,
        },
        [`${key}BLRadius`]: {
            borderBottomLeftRadius: value,
        },
        [`${key}BRRadius`]: {
            borderBottomRightRadius: value,
        },

    }), {}));
}
