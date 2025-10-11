/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, ContainerComponent, InputComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors';
import { ArrowRight, Sms } from 'iconsax-react-native';
import { Validate } from '../../utils/validate';
import { LoadingModal } from '../../modals';
import authencationAPI from '../../apis/authApi';

const ForgotPassword = () => {

    const[email, setEmail]= useState("");
    const [isDisable, setIsDisable]= useState(true);
    const [isLoading, setIsLoading]= useState(false);
    const handleCheckEmail = () =>{
    const isValidEmail = Validate.email(email);
       setIsDisable(!isValidEmail);
    }
    const handleForgotPassword = async() =>{
       const api = `/forgotPassword`;
       setIsLoading(true);
         try {
            const res:any = await authencationAPI.HandleAuthentication(api, {email}, 'post');
            console.log(res);
            Alert.alert('Thông báo','Mật khẩu mới đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến!!!');
            setIsLoading(false);
         }catch (error) {
            setIsLoading(false);
            console.log(`Can not crate new password api forgot password ${error}`);
         }
    }

  return (
    <ContainerComponent back isImageBackground isScroll>
<SectionComponent>
    <TextComponent text='Đặt lại mật khẩu' title/>
    <SpaceComponent height={12}/>
    <TextComponent text='Vui lòng nhập địa chỉ email của bạn để đặt lại mật khẩu.'/>
    <SpaceComponent height={26}/>
<InputComponent
    value={email}
    onChange={val=> setEmail(val)}
    affix={<Sms size={20}
    color={appColors.gray}/>}
    placeholder='abc@gmail.com'
    onEnd={handleCheckEmail}
/>
</SectionComponent>

<SectionComponent>
    <ButtonComponent onPress={handleForgotPassword} disable ={isDisable} text='Gửi' type='primary' icon={<ArrowRight size={20} color={appColors.white}/>} iconFlex='right'/>
</SectionComponent>
    <LoadingModal visible={isLoading}/>
    </ContainerComponent>
  )
}

export default ForgotPassword