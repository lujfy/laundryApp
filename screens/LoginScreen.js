import { ActivityIndicator, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Fontisto , Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = () => {
    const [ email , setEmail ] = useState("")
    const [ loading , setLoading ] = useState(false)
    const [ password , setPassword ] = useState("")
    const navigation = useNavigation()

    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(!authUser) {
                setLoading(false)
            }
            if(authUser) {
                navigation.navigate("Home")
            }
        }) ;

        return unsubscribe

    } , [])

    const login = () => {
        signInWithEmailAndPassword(auth , email , password).then((userCredential) => {
            console.log("user credential" , userCredential);
            const user = userCredential.user
            console.log("user detail" , user);
        })
    }
  return (
    <SafeAreaView style={{ flex : 1 , backgroundColor : 'white' , alignItems : 'center' , padding : 10}}>

        {loading ? (
            <View style={{ alignItems : 'center' , justifyContent : 'center' , flexDirection : 'row' , flex : 1}}>
                <Text style={{marginRight : 10 }}>Loading</Text>
                <ActivityIndicator size={'large'} color={'red'}/>
            </View>
        ) : (
            <KeyboardAvoidingView>
            <View style={{ justifyContent : 'center' , alignItems : 'center' , marginTop : 100}}>
                <Text style={{ fontSize : 20 , color : '#662d91' , fontWeight : 'bold'}}>Sign In</Text>

                <Text style={{ fontSize : 18 , marginTop : 8 , fontWeight : 600}}>Sign In to your Account</Text>
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

                <Pressable onPress={login} style={{ width : 200 , backgroundColor : '#007FFF' , padding : 15 , borderRadius : 7 , marginTop : 50 , marginLeft : 'auto' , marginRight : 'auto'}}>
                    <Text style={{ fontSize : 18 , textAlign : 'center' , color : 'white'}}>Login</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop : 20}}>
                    <Text style={{ 
                        textAlign : 'center' , 
                        fontSize : 17 ,
                        color : 'gray' ,
                        fontWeight : '500'
                        }}>Don't have an account ? Sign Up</Text>
                </Pressable>

            </View>
        </KeyboardAvoidingView>
        )}

    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})