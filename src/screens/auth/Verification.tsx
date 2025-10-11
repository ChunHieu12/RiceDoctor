import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ButtonComponent, ContainerComponent, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { appColors } from '../../constants/appColors';
import { fontFamilies } from '../../constants/fontFamilies';
import { ArrowRight } from 'iconsax-react-native';
import { globalStyles } from '../../styles/globalStyles';
import authencationAPI from '../../apis/authApi';
import { LoadingModal } from '../../modals';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Verification = ({navigation, route}:any) => {    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const{code, email, password, username}= route.params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[currentCode, setCurrentCode] = useState<string>(code);
  const[codeValues, setCodeValues] = useState<string[]>([]);
  const[newCode, setNewCode]=useState("");
  const[limit, setLimit]= useState(120);
  const[isLoading, setIsLoading]= useState(false);
  const [errorMessage, setErrorMessage]= useState("");
  const ref1 = useRef<any>("");
  const ref2 = useRef<any>("");
  const ref3 = useRef<any>("");
  const ref4 = useRef<any>("");
  const dispatch = useDispatch();
  useEffect(()=>{
    ref1.current.focus();
  },[]);

  useEffect(()=>{
   
    if (limit > 0) {
      const interval = setInterval(()=>{
       setLimit (limit=>limit-1);
    },1000)
    return()=> clearInterval(interval)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[limit]);

  useEffect(()=>{
    let item = ``;

    codeValues.forEach(val=>(item += val));
  

    setNewCode(item);
  },[codeValues]);
  const handleChangeCode = (val: string, index: number)=>{
    const data = [...codeValues]
    data[index] = val;
    setCodeValues(data);
  };
  const handleResendVerification = async()=>{
    setCodeValues(["","","",""]);
    setNewCode("");
   const api = `/verification`
   setIsLoading(true)
    try {
      const res:any = await authencationAPI.HandleAuthentication(api, {email}, 'post')
      setLimit(120)
      setCurrentCode(res.data.code)
      // console.log(res)
      setIsLoading(false)

      console.log(res.data.code)
    } catch (error) {
      setIsLoading(false)
      console.log(`Can not send verification code ${error}`)
    }
  };

  const handleVerification = async ()=>{

    if (limit>0) {
      if(parseInt(newCode) !== parseInt(currentCode)){
        setErrorMessage('Invalid code!!!')
      }else{
        setErrorMessage("")
        const api =`/register`
        const data ={
          email, password, fullname:username ?? ""
        }

        try {
          const res:any = await authencationAPI.HandleAuthentication(
            api,
            data,
            'post',
          );
         dispatch(addAuth(res.data));
            await AsyncStorage.setItem('auth', JSON.stringify(res.data));
          setErrorMessage('User has already exist!!!')
        } catch (error) {
          console.log(`Can not create new user ${error}`)
        }
      }
    }else{
  setErrorMessage('Time out verification code, please resend new verification code!')
    }
  }

  return (
   <ContainerComponent back isImageBackground isScroll>
    <SectionComponent>
       <TextComponent text='Xác minh email' title/>
       <SpaceComponent height={12}/>
    <TextComponent text={`Chúng tôi đang gửi cho bạn mã xác minh qua email ${email.replace(
      /.{1,5}/,
      (m:any)=>'*'.repeat(m.length),
      )}`}
      />
    <SpaceComponent height={26}/>
    <RowComponent justify='space-around'>
      <TextInput 
      keyboardType='number-pad' 
      ref={ref1} 
      value={codeValues[0]}
      style={[styles.input]} 
      maxLength={1} 
      onChangeText={val=>{
        val.length>0 && ref2.current.focus();
         handleChangeCode(val,0);
      }}
       placeholder='-'
       />

      <TextInput 
       ref={ref2} 
      value={codeValues[1]}

      keyboardType='number-pad'
      onChangeText={val=>{
       handleChangeCode(val,1); 
       val.length>0 && ref3.current.focus();
      }} 
      style={[styles.input]} 
      maxLength={1}
      placeholder='-'
      />


      <TextInput 
      ref={ref3}
      value={codeValues[2]}
      keyboardType='number-pad' 
      onChangeText={val=>{
        handleChangeCode(val,2); 
        val.length>0 && ref4.current.focus();
      }}
       style={[styles.input]} 
       maxLength={1}
       placeholder='-'
       />


      <TextInput 
      ref={ref4}
      value={codeValues[3]}
      keyboardType='number-pad'
      onChangeText={val=>{
       handleChangeCode(val, 3);
     
      }} 
      style={[styles.input]}
      maxLength={1}
       placeholder='-'
       />
    </RowComponent>
    </SectionComponent>
    <SectionComponent styles={{marginTop:40}}>
      <ButtonComponent 
      disable={newCode.length!==4}
      onPress={handleVerification} 
      text='Tiếp tục' 
      type='primary'
      iconFlex='right'
      icon={
        <View style={[globalStyles.iconContainer,{backgroundColor: newCode.length !==4 ? appColors.gray:appColors.primary}]}>
        <ArrowRight size={18} color={appColors.white} />
        </View>
        }
        />
    </SectionComponent>
    {
      // eslint-disable-next-line react-native/no-inline-styles
      errorMessage&&(
      <SectionComponent>

        <TextComponent styles={{textAlign: 'center'}} text={errorMessage} color={appColors.error}/>
      </SectionComponent>
 )   }
    <SectionComponent>
        {
          limit>0?(
      <RowComponent justify='center'>
        <TextComponent text='Gửi lại mã sau ' flex={0}/>
        <TextComponent text={`${(limit -(limit % 60))/60}:${limit-(limit-(limit % 60))}`} flex={0} color={appColors.link}/>
      </RowComponent>
           ) :( 
            <RowComponent>

              <ButtonComponent 
         type='link' 
         text='Gửi lại mã xác minh' 
         onPress={handleResendVerification}
         />
            </RowComponent>
        )}

    </SectionComponent>
    <LoadingModal visible={isLoading}/>
   </ContainerComponent>
  )
}

export default Verification

const styles = StyleSheet.create({
input:{
  height:55,
  width: 55,
  borderRadius:12,
  borderWidth:1,
  borderColor: appColors.gray2,
  justifyContent:'center',
  alignItems:'center',
  fontSize: 24,
  fontFamily: fontFamilies.Bold,
  textAlign: 'center'
}

})