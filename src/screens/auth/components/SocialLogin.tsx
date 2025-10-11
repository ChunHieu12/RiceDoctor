/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
import { appColors } from '../../../constants/appColors'
import { fontFamilies } from '../../../constants/fontFamilies'
import { Google } from '../../../assets/svgs'
import { Facebook } from '../../../assets/svgs'
import { GoogleSignin, User } from '@react-native-google-signin/google-signin'
import authencationAPI from '../../../apis/authApi'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../../redux/reducers/authReducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
GoogleSignin.configure({
  webClientId: '866590119105-bchj3288gpp5hqo1e520635abur9cduf.apps.googleusercontent.com'
});
// import { Google } from 'iconsax-react-native'

const SocialLogin = () => {

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleLoginWithGoogle = async () => {
    await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
const api = `/google-signin`;

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // const user = (userInfo as any).user || userInfo;
      const user = userInfo.user;
     const res:any = await authencationAPI.HandleAuthentication(api, user, 'post');
      console.log(res.data);
    dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data))
    } catch (error) {
      console.log(error);
    }
  };
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
      {/* <ButtonComponent text='Logout' onPress={async()=>await GoogleSignin.signOut()}/> */}
      <ButtonComponent 
      type='primary'
      onPress={handleLoginWithGoogle}
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

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { View, Text } from 'react-native'
// import React from 'react'
// import { ButtonComponent, SectionComponent, SpaceComponent, TextComponent } from '../../../components'
// import { appColors } from '../../../constants/appColors'
// import { fontFamilies } from '../../../constants/fontFamilies'
// import { Google } from '../../../assets/svgs'
// import { Facebook } from '../../../assets/svgs'
// import { GoogleSignin } from '@react-native-google-signin/google-signin'
// import authencationAPI from '../../../apis/authApi'
// GoogleSignin.configure(
//   {
//     webClientId:'866590119105-bchj3288gpp5hqo1e520635abur9cduf.apps.googleusercontent.com'
//   }
// );
// // import { Google } from 'iconsax-react-native'

// const SocialLogin = () => {
//   const [isLoading, setIsLoading] = React.useState(false);
//   const handleLoginWithGoogle = async()=>{
//     await GoogleSignin.hasPlayServices({
//       showPlayServicesUpdateDialog:true,
//     });
//     const api = `/google-signin`;

//     try {
//       await GoogleSignin.hasPlayServices();
//       const userInfo = await GoogleSignin.signIn();
//       const user = userInfo.user;
//      const res:any= await authencationAPI.HandleAuthentication(api, user, 'post');
//      console.log(res);
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <SectionComponent>
//       <TextComponent 
//       styles={{textAlign:'center'}}
//       text='hoặc Đăng nhập với'
//       color={appColors.gray4}
//       size={16}
//       font={fontFamilies.medium}
//       />
//       <SpaceComponent height={16}/>
//       <ButtonComponent text='Logout' onPress={async()=>await GoogleSignin.signOut()}/>
//       <ButtonComponent 
//       type='primary'
//       color={appColors.white}
//       textColor={appColors.text}
//       textFont={fontFamilies.regular}
//       text='Đăng nhập với Google'
//       icon={<Google/>}
//       iconFlex='left'
//       />
//       <ButtonComponent 
//       type='primary'
//       color={appColors.white}
//       textColor={appColors.text}
//       textFont={fontFamilies.regular}
//       text='Đăng nhập với Facebook'
//       icon={<Facebook/>}
//       iconFlex='left'
//       />
//     </SectionComponent>
//   )
// }

// export default SocialLogin