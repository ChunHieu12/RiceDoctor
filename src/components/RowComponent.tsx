/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleProp, ViewStyle, Touchable, TouchableOpacity } from 'react-native'
import React, { ReactNode } from 'react'
import { globalStyles } from '../styles/globalStyles';

interface Props{
    justify?:"center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "space-evenly" | undefined,
    styles?:StyleProp<ViewStyle>
    children: ReactNode;
    onPres?: ()=>void
    
}
const RowComponent = (props:Props) => {
    const{justify, styles, children, onPres}=props;
    const localStyle =[globalStyles.row,{
    justifyContent:justify
    }, styles]

  return onPres?(<TouchableOpacity activeOpacity={0.9} onPress={onPres} style ={localStyle} >
{children}
  </TouchableOpacity>): (
    <View
    style={localStyle}>{children}</View>
  )
}

export default RowComponent