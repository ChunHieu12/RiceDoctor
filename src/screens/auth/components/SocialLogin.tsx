/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native'
import React from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamilies } from '../../../constants/fontFamilies'
import { Google } from '../../../assets/svgs'
import { Facebook } from '../../../assets/svgs'

// import { Google } from 'iconsax-react-native'

const SocialLogin = () => {
  return (
    <SectionComponent>
      <TextComponent 
      styles={{textAlign:'center'}}
      text='hoặc Đăng nhập với'
      color={appColors.gray4}
      size={16}
      font={fontFamilies.medium}
      />
      <SpaceComponent height={16}/>
      <ButtonComponent 
      type='primary'
      color={appColors.white}
      textColor={appColors.text}
      textFont={fontFamilies.regular}
      text='Đăng nhập với Google'
      icon={<Google/>}
      iconFlex='left'
      />
      <ButtonComponent 
      type='primary'
      color={appColors.white}
      textColor={appColors.text}
      textFont={fontFamilies.regular}
      text='Đăng nhập với Facebook'
      icon={<Facebook/>}
      iconFlex='left'
      />
    </SectionComponent>
  )
}

export default SocialLogin