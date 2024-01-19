import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View , Pressable , TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { Fontisto , Ionicons , Feather } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {

  const [ email , setEmail ] = useState("")
  const [ password , setPassword ] = useState("")
  const [ phone , setPhone ] = useState("")

  const register = () => {
    if(email === "" || password === "" || phone === ""){
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
      console.log("user credential",userCredential);
      const user = userCredential._tokenResponse.email;
      const myUserUid = auth.currentUser.uid;

      setDoc(doc(db,"users",`${myUserUid}`),{
        email:user,
        phone:phone
      })
    })
  }

  return (
    <SafeAreaView
      style={{
        flex : 1 ,
        backgroundColor : 'white' ,
        alignItems : 'center' ,
        padding : 10
      }}
    >
        <KeyboardAvoidingView>

            <View style={{ justifyContent : 'center' , alignItems : 'center' , marginTop : 100}}>
                <Text style={{ fontSize : 20 , color : '#662d91' , fontWeight : 'bold'}}>Register</Text>

                <Text style={{ fontSize : 18 , marginTop : 8 , fontWeight : 600}}>Create a new Account</Text>
            </View>

            <View style={{marginTop:50}}>

                <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                    <Fontisto name="email" size={24} color="black" />
                    <TextInput 
                        placeholder='Email' 
                        value={email} 
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor={'black'} 
                        style={{
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            fontSize : email ? 18 : 18 , 
                            marginLeft : 13 , 
                            width : 300 , 
                            marginVertical : 10}}/>
                </View>

                <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                    <Ionicons name="key-outline" size={24} color="black" />
                    <TextInput 
                        placeholder='Password' 
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                        placeholderTextColor={'black'} 
                        style={{
                            fontSize : password ? 18 : 18 ,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1,
                            marginLeft : 13 , 
                            width : 300 , 
                            marginVertical : 10}}
                    />
                </View>


                <View style={{ flexDirection : 'row' , alignItems : 'center'}}>
                    <Feather name="phone" size={24} color="black" />
                    <TextInput 
                        placeholder='Phone number' 
                        value={phone} 
                        onChangeText={(text) => setPhone(text)}
                        
                        placeholderTextColor={'black'} 
                        style={{
                            fontSize : phone ? 18 : 18 ,
                            borderBottomColor: "gray",
                            borderBottomWidth: 1, 
                            marginLeft : 13 , 
                            width : 300 , 
                            marginVertical : 10}}
                    />
                </View>

                <Pressable onPress={register} style={{ width : 200 , backgroundColor : '#007FFF' , padding : 15 , borderRadius : 7 , marginTop : 50 , marginLeft : 'auto' , marginRight : 'auto'}}>
                    <Text style={{ fontSize : 18 , textAlign : 'center' , color : 'white'}}>Register</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop : 20}}>
                    <Text style={{ 
                        textAlign : 'center' , 
                        fontSize : 17 ,
                        color : 'gray' ,
                        fontWeight : '500'
                        }}>Already have an Account ?, Sign In</Text>
                </Pressable>

            </View>

        </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})