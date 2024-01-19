import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const user = auth.currentUser ;
  const navigation = useNavigation()
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace("login")
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <SafeAreaView style={{ flex : 1 , justifyContent : 'center' , alignItems : 'center'}}>

      <Pressable style={{ marginVertical : 10}}>
        <Text>Welcome {user.email}</Text>
      </Pressable>

      <Pressable>
        <Text>Sign Out</Text>
      </Pressable>

    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})