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
import { addAuth } from '../../redux/reducers/authReducer'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface errorMessages {
    email:string,
    password:string,
    confirmPassword: string,
}
const initValue ={
    username:'',
    email:'',
    password:'',
    confirmPassword:'',
}



 const SignUpScreen = ({navigation}:any) => {
 const[values, setValues]=useState(initValue);
 const[isLoading, setIsLoading] = useState(false);
 const[errorMessage, setErrorMessage]=useState<any>();
 const [isDisable, setIsDisable] =  useState(true);
 
 const dispatch = useDispatch();
 useEffect(()=>{
    if (!errorMessage || (errorMessage &&(errorMessage.email|| errorMessage.password || errorMessage.confirmPassword)) || (!values.email || !values.password || !values.confirmPassword)) {
        setIsDisable(true);
    }else{
        setIsDisable(false);
    }
 }, [errorMessage, values])

 const handleChangeValue = (key:string, value:string)=>{
    const data:any ={...values};
    data[`${key}`] = value;
    setValues(data);
 }

 const formValidator = (key:string)=>{
    const data = {...errorMessage}
    let message = ``
    switch(key){
        case 'email':
            if (!values.email) {
                message = `Email is required!!`
            }else if (!Validate.email(values.email)) {
              message= 'Email is not invalid!!'  
            }else{
                message = '';
            }
               
        break;
        case 'password':
            message=!values.password ? `Password is required!!!`: '';

            break;
        case 'confirmPassword':
            if (!values.confirmPassword) {
                message = `Please type confirm password!`;
                
            }else if (values.confirmPassword !== values.password) {
                message = 'Password is not match!!!'
            }else{
                message = ''

            }
            break;
    }
    data[`${key}`] = message;
    setErrorMessage(data);
 }

 const handleRegister = async()=>{
    const api = `/verification`
    setIsLoading(true)
    try {
        const res = await authencationAPI.HandleAuthentication(api, {email: values.email}, 'post')
  
        setIsLoading(false);
        navigation.navigate('Verification' ,{
            code:res.data.code,
           ...values,
        });
    } catch (error) {
        console.log(error)   
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
        onEnd={()=>formValidator('email')}
        />
         <InputComponent
        value={values.password}
        placeholder="Mật khẩu mới"
        onChange={val=> handleChangeValue('password',val)} 
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
        onEnd={()=>formValidator('password')}
        />
         <InputComponent
        value={values.confirmPassword}
        placeholder="Nhập lại mật khẩu"
        onChange={val=> handleChangeValue('confirmPassword',val)} 
        isPassword
        allowClear
        affix={<Lock size={22} color={appColors.gray} />}
        onEnd={()=>formValidator('confirmPassword')}
        />
      
        </SectionComponent>
        {errorMessage &&(
            <SectionComponent>
                {Object.keys(errorMessage).map(
                    (error, index)=>
                        errorMessage[`${error}`] && (
                        <TextComponent 
                        text={errorMessage[`${error}`]} 
                        key={`error${index}`}
                         color={'coral'}
                         />
                        ),

                        )}
                
        </SectionComponent>
        )}

  
        <SpaceComponent height={5}/>
        <SectionComponent>
            <ButtonComponent onPress={handleRegister} text="Đăng ký" disable={isDisable} type='primary'/>
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