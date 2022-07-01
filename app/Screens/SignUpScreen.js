import { View, Text, Image, StyleSheet} from 'react-native'
import React, {useState} from 'react'

import CustomInput from '../CustomComponents/CustomInput'
import CustomButton from '../CustomComponents/CustomButton'
// import {auth} from '../firebase'

const SignUpScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

const handleSignUp = () => {
  // auth.createUserWithEmailAndPassword(email, password)
  // .then(userCredentials => {
  //   const user = userCredentials.user;
  //   console.log(`Registered with: `, user.email)
  // })
  // .catch(error => {alert(error.message)})
}

const onSignInPressed = () => {
  console.warn('Sign In')
}

const onForgotPasswordPressed = () => {
  console.warn('Forgot Password')
}

const onCreateAccountPressed = () => {
  console.warn('Create Account')
}


  return (
    <View style = {styles.logotitle}>
      <Text style = {styles.title}>Create an Account</Text>

      <CustomInput
        inputField = {'Username'}
        value = {username}
        setValue = {setUsername}
        secureTextEntry = {false}
        />

        <CustomInput
        inputField = {'Email'}
        value = {email}
        setValue = {setEmail}/>

      <CustomInput
        inputField = {'Password'}
        value = {password}
        setValue = {setPassword}
        secureTextEntry = {true}/>

      <CustomInput
        inputField = {'Re-type Password'}
        value = {passwordRepeat}
        setValue = {setPasswordRepeat}
        secureTextEntry = {true}/>

        <CustomButton text = 'Register' onPress = {handleSignUp} />
        <Text style = {styles.termsOfUse}>By registering, you confirm that you accept our Terms of Use and Privacy Policy</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  logotitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 150,
    paddingHorizontal: 20
  },
  termsOfUse: {
    color: 'gray',
    marginVertical: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold'
  },

})
export default SignUpScreen
