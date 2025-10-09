/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle, View} from 'react-native';
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
    textFont?:string;
    textColor?: string;
    textStyles?: StyleProp<TextStyle>;
    onPress?: () => void;
    iconFlex?: 'right' | 'left';
    disable?:boolean;
}
const ButtonComponent = (props: Props) => {

    const { icon, text, textColor, textStyles, color, styles, onPress, iconFlex, type, textFont, disable } = props;

    return type === 'primary' ? (
<View style={{alignItems: 'center'}}>
            <TouchableOpacity disabled={disable}
            onPress={onPress}
            style={[globalStyles.button,
                globalStyles.shadow,
            { backgroundColor: color ? color: disable ?appColors.gray4: appColors.primary,
                marginBottom:16,
                width:'90%'
             },
                styles,
            ]}>
            {icon && iconFlex ==='left' && icon}
            <TextComponent
                text={text}
                color={textColor ?? appColors.white}
                
                styles={[
                    textStyles,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        marginLeft: icon ? 12 : 0,
                        fontSize:16,
                        textAlign: 'center',
                    },
                ]}
                flex={icon && iconFlex === 'right' ? 1 : 0}
                font={textFont??fontFamilies.medium}
              

            />
            {icon && iconFlex === 'right' && icon}
        </TouchableOpacity>
</View>

    ) : (
    <TouchableOpacity onPress={onPress}>
        <TextComponent
        flex={0}
        text={text}
        color={type === 'link' ? appColors.link : appColors.text} />
    </TouchableOpacity>


    )
}

export default ButtonComponent