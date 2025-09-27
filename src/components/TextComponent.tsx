import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';

interface Props {
    text: string;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean
}


const TextComponent = (props: Props) => {

    const { text, size, flex, font, color, styles, title } = props;
    return (

        <Text style={[
            globalStyles.text,
            // eslint-disable-next-line react-native/no-inline-styles
            {
                color: color ?? appColors.text,
                flex: flex ?? 0,
                fontSize: size ?? title ? 24 : 14,
                fontFamily: font ?? title ? fontFamilies.Bold : fontFamilies.regular

            },
            styles,
        ]}>{text}</Text>

    )
}

export default TextComponent