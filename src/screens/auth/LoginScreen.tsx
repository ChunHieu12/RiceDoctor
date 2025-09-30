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
import authencationAPI from '../../apis/authApi'

const LoginScreen = ({navigation}:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember]=useState(true);

    const handleLogin = async()=>{
       try {
        const res = await authencationAPI.HandleAuthentication('/hello');
        console.log(res);
       } catch (error) {
        console.log(error);
       }
    };

    return (
    <ContainerComponent isImageBackground isScroll>
        <SectionComponent styles={{
            justifyContent:'center',
            alignItems:'center',
            marginTop:20,
        }}>
            <Image source={require('../../assets/images/logo-img.png')}
            style={{
                width: 145,
                height:120,
                marginBottom:10,
            }}
            
            />
        </SectionComponent>
        <SectionComponent>
            <TextComponent styles={{paddingLeft:2}} size={23} title text='Đăng nhập'/>
            <SpaceComponent height={21}/>

        <InputComponent
        value={email}
        placeholder="Email"
        onChange={val=>setEmail(val)} 
        // isPassword
        allowClear
   
        affix={<Sms size={22} color={appColors.gray} />}
        />
         <InputComponent
        value={password}
        placeholder="Password"
        onChange={val=>setPassword(val)} 
        isPassword
        allowClear
   
        affix={<Lock size={22} color={appColors.gray} />}
        />
        <RowComponent justify="space-between">
            <RowComponent onPres={()=> setIsRemember(!isRemember)}>

            <Switch
            trackColor={{true:appColors.primary}}
            thumbColor={appColors.white}
            value={isRemember}
            onChange={()=>setIsRemember(!isRemember)}
            />
            <TextComponent text='Nhớ mật khẩu'/>
            </RowComponent>
            <ButtonComponent
            text='Quên mật khẩu?'
            onPress={()=>navigation.navigate('ForgotPassword')}
            type='text'
            />
        </RowComponent>
        </SectionComponent>
        <SpaceComponent height={16}/>
        <SectionComponent>
            <ButtonComponent onPress={handleLogin} text="Đăng nhập" type='primary'/>
        </SectionComponent>
<SocialLogin/>
        <SectionComponent>
            <RowComponent justify='center'>
                <TextComponent text="Bạn chưa có tài khoản?" />
                <ButtonComponent type='link' text='Đăng kí ngay!' onPress={()=>navigation.navigate('SignUpScreen')}/>
            </RowComponent>
        </SectionComponent>
    </ContainerComponent>
            
      
    )
}

export default LoginScreen