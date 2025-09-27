import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';
import { globalStyles } from '../styles/globalStyles';
import TextComponent from './TextComponent';



interface Props {
    icon?: ReactNode;
    text: string;
    type?: 'primary' | 'text' | 'link';
    color?: string;
    styles?: StyleProp<ViewStyle>;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
}
const ButtonComponent = (props: Props) => {

    const { icon, text, textColor, textStyles, color, styles, onPress, iconFlex, type } = props;

    return type === 'primary' ? (

        <TouchableOpacity
            onPress={onPress}
            style={[globalStyles.button,
            { backgroundColor: color ?? appColors.primary },
                styles,
            ]}>
            {icon && icon}
            <TextComponent
                text={text}
                color={textColor ?? appColors.white}
                font={fontFamilies.medium}
                styles={[
                    textStyles,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginLeft: icon ? 12 : 0,
                    },
                ]}
                flex={icon && iconFlex === 'right' ? 1 : 0}

            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
    ) : (<TouchableOpacity>
        <TextComponent text={text} color={type === 'link' ? appColors.link : appColors.text} />
    </TouchableOpacity>


    )
}

export default ButtonComponent