/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useEffect, useState } from 'react'
import { Image, Switch, Text, View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { ButtonComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { Lock, Sms } from 'iconsax-react-native'
import { fontFamilies } from '../../constants/fontFamilies'
import { Button } from '@react-navigation/elements'
import SocialLogin from './components/SocialLogin'
import { LoadingModal } from '../../modals'
import authencationAPI from '../../apis/authApi'
import { Validate } from '../../utils/validate'
const initValue ={
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
}



 const SignUpScreen = ({navigation}:any) => {
 const[values, setValues]=useState(initValue);
 const[isLoading, setIsLoading] = useState(false);
 const[errorMessage, setErrorMessage]=useState('');
 useEffect(()=>{
    if(values.email || values.password){
        setErrorMessage('')
    }
 }, [values.email, values.password]);
 const handleChangeValue = (key:string, value:string)=>{
    const data:any ={...values};
    data[`${key}`] = value;
    setValues(data);
 }

 const handleRegister = async()=>{
    const{email, password, confirmPassword}=values
    const emailValidation = Validate.email(email)
    const passValidation = Validate.Password(password)
   
    if(email && password && confirmPassword) {
         if (emailValidation && passValidation) {
        setErrorMessage('');
        setIsLoading(true);
        try {
            const res = await authencationAPI.HandleAuthentication(
            '/register',
            {
                fullname: values.username,
                email,
                password,
            },
            'post',
        )

            console.log(res);
            setIsLoading(false);
            
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }else{
        setErrorMessage('Email chưa chính xác!')
    }

        
    }else{
        setErrorMessage('Vui lòng nhập đầy đủ thông tin!')
    }


}
    // const [isRemember, setIsRemember]=useState(true);
    return (
        <>
        
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
        <SectionComponent>

        {
            errorMessage && <TextComponent text={errorMessage} color={'coral'}/>
        }
        </SectionComponent>
        <SpaceComponent height={5}/>
        <SectionComponent>
            <ButtonComponent onPress={handleRegister} text="Đăng ký" type='primary'/>
        </SectionComponent>
<SocialLogin/>
        <SectionComponent>
            <RowComponent justify='center'>
                <TextComponent text="Bạn chưa có tài khoản?" />
                <ButtonComponent type='link' text='Đăng nhập' onPress={()=>navigation.navigate('LoginScreen')}/>
            </RowComponent>
        </SectionComponent>
    </ContainerComponent>
        <LoadingModal visible={isLoading}/>
        </>
            
      
    )
}

export default SignUpScreen;