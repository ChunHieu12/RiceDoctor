/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import React, { useState } from 'react'
import { View } from 'react-native'
import { globalStyles } from '../../styles/globalStyles'
import { InputComponent } from '../../components'
import { appColors } from '../../constants/appColors'
import { Lock, Sms } from 'iconsax-react-native'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <View
            style={[
                globalStyles.container,
                {
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 20,
                }
            ]}>
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
            
        </View>
    )
}

export default LoginScreen