/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { ActivityIndicator, Image, ImageBackground } from 'react-native'
import { SpaceComponent } from '../components'
import { appColors } from '../constants/appColors'

const SplashScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/splash-img.png')} style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',

        }} imageStyle={{ flex: 1 }}>

            <Image source={require('../assets/images/logo-img.png')} style={{
                width: 250,
                resizeMode: 'contain',

            }}
            />
            <SpaceComponent height={16} />
            <ActivityIndicator color={appColors.gray} size={22} />


        </ImageBackground>
    )
}

export default SplashScreen