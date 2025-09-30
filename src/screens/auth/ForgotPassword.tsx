/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors';
import { ArrowRight, Sms } from 'iconsax-react-native';

const ForgotPassword = () => {

    const[email, setEmail]= useState('');
  return (
    <ContainerComponent back isImageBackground>
<SectionComponent>
    <TextComponent text='Đặt lại mật khẩu' title/>
    <TextComponent text='Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu.'/>
    <SpaceComponent height={26}/>
<InputComponent
    value={email}
    onChange={val=> setEmail(val)}
    affix={<Sms size={20}
    color={appColors.gray}/>}
    placeholder='abc@gmail.com'
/>
</SectionComponent>

<SectionComponent>
    <ButtonComponent text='Gửi' type='primary' icon={<ArrowRight size={20} color={appColors.white}/>} iconFlex='right'/>
</SectionComponent>

    </ContainerComponent>
  )
}

export default ForgotPassword