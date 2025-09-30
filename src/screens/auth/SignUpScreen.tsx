/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import { Image, Switch, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { Lock, Sms } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import { Button } from '@react-navigation/elements'
import SocialLogin from './components/SocialLogin'
const initValue ={
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
}
const SignUpScreen = ({navigation}:any) => {
 const[values, setValues]=useState(initValue);
 const handleChangeValue = (key:string, value:string)=>{
    const data:any ={...values};
    data[`${key}`] = value;
    setValues(data);
 }
    // const [isRemember, setIsRemember]=useState(true);
    return (
    <ContainerComponent isImageBackground isScroll back>
        {/* <SectionComponent styles={{
            justifyContent:'center',
            alignItems:'center',
            marginTop:75,
        }}>
            <Image source={require('../../assets/images/logo2.png')}
            style={{
                width: 50,
                height:50,
                marginBottom:30,
            }}
            
            />
        </SectionComponent> */}
        <SectionComponent>
            <TextComponent styles={{paddingLeft:2}} size={23} title text='Đăng ký'/>
            <SpaceComponent height={21}/>

        <InputComponent
        value={values.username}
        placeholder="Tên đăng nhập"
        onChange={val=> handleChangeValue('username',val)} 
        // isPassword
        allowClear
   
        affix={<Sms size={22} color={appColors.gray} />}
        />
         <InputComponent
        value={values.email}
        placeholder="Địa chỉ Email"
        onChange={val=> handleChangeValue('email',val)} 
        // isPassword
        allowClear
   
        affix={<Sms size={22} color={appColors.gray} />}
        />
         <InputComponent
        value={values.password}
        placeholder="Mật khẩu mới"
        onChange={val=> handleChangeValue('password',val)} 
        isPassword
        allowClear
   
        affix={<Sms size={22} color={appColors.gray} />}
        />
         <InputComponent
        value={values.confirmPassword}
        placeholder="Nhập lại mật khẩu"
        onChange={val=> handleChangeValue('confirmPassword',val)} 
        isPassword
        allowClear
   
        affix={<Sms size={22} color={appColors.gray} />}
        />
         {/* <InputComponent
        value={password}
        placeholder="Password"
        onChange={val=>setPassword(val)} 
        isPassword
        allowClear
   
        affix={<Lock size={22} color={appColors.gray} />}
        /> */}
      
        </SectionComponent>
        <SpaceComponent height={16}/>
        <SectionComponent>
            <ButtonComponent text="Đăng ký" type='primary'/>
        </SectionComponent>
<SocialLogin/>
        <SectionComponent>
            <RowComponent justify='center'>
                <TextComponent text="Bạn chưa có tài khoản?" />
                <ButtonComponent type='link' text='Đăng nhập' onPress={()=>navigation.navigate('LoginScreen')}/>
            </RowComponent>
        </SectionComponent>
    </ContainerComponent>
            
      
    )
}

export default SignUpScreen;