import { StyleSheet, Text, View , SafeAreaView, Alert, Pressable , Image, TextInput, ScrollView } from 'react-native'
import React , { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { MaterialIcons , AntDesign } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'
import { collection, getDoc, getDocs } from 'firebase/firestore';



const HomeScreen = () => {
  const carts = useSelector((state) => state.cart.cart)
  const total = carts.map((item) => item.quantity + item.price).reduce((curr,prev) => curr + prev , 0)
  const navigation = useNavigation()
  console.log(carts)
  const [ displayCurrentAddress , setDisplayCurrentAddress ] = useState("we are looking for your location")
  const [ locationServiceEnabled , setLocationServiceEnabled ] = useState(false)
  const [ items , setItems ] = useState([])
    useEffect(() => {
      checkIfLocationEnabled();
      getCurrentLocation() ;
    } , [])

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync() ;
    if(!enabled) {
      Alert.alert(
        'Location services not enabled', 
        'Please enable the location services', 
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    } else {
      setLocationServiceEnabled(enabled)

    }


  }

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync() ;
    if( status !== 'granted' ) {
      Alert.alert(
        'Permission denided', 
        'Please enable the location services', 
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    }

    const { coords } = await Location.getCurrentPositionAsync() ;

    if( coords ) {
      const { latitude , longitude } = coords ;

      let respone = await Location.reverseGeocodeAsync({
        latitude ,
        longitude 
      })

      //console.log(respone)

      for (let item of respone) {
        let address = `${item.name} ${item.city} ${item.postalCode}` ;

        setDisplayCurrentAddress(address)
        
      }
    }
  }

  const product = useSelector((state) => state.product.product)
  const dispatch = useDispatch()
  useEffect(() => {
    if(product.length > 0) return ;

    const fetchProducts = async () => {
      const colRef =  collection(db , "types") ;
      const docsSnap = await getDocs(colRef) 
      docsSnap.forEach((doc) => {
        items.push(doc.data())
      });
      items?.map((service) => dispatch(getProducts(service)))
    }

    fetchProducts() ;
  } , [])

  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "1",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "2",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "3",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "4",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "5",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "6",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <ScrollView style={{ backgroundColor : '#F0F0F0' , padding : 10 , marginTop : 50}}>
        {/* location and profile */}
        <View style={{marginTop: 15 ,flexDirection : 'row' , alignItems : 'center' , padding : 10}}>
          <MaterialIcons name="location-on" size={24} color="#fd5c63" />

          <View>
            <Text style={{ fontSize : 18 , fontWeight : 600}}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>

          <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft : 'auto' , marginRight : 7}}>
            <Image style={{ width : 40 , height : 20 , borderRadius : 20}} source={{uri : "https://i.pinimg.com/564x/65/d6/c4/65d6c4b0cc9e85a631cf2905a881b7f0.jpg"}}/>
          </Pressable>

        </View>

        {/* search bar */}

        <View style={{ 
          padding : 10 , 
          margin : 10 , 
          flexDirection : 'row' , 
          alignItems : 'center' ,
          justifyContent : 'space-between' ,
          borderWidth : 0.8 ,
          borderColor : '#C0C0C0' ,
          borderRadius : 7 ,

          }}>
          <TextInput placeholder='Search for Item or More'/>
          <AntDesign name="search1" size={24} color="black" />
        </View>

        {/*Image Carosel */}
        <Carousel />

        {/* Services components */}
        <Services />

        {/* Render all item */}
        { product.map((item , index) =>(
          <DressItem item={item} key={index}/>
        )
        ) }


      </ScrollView>
      
      { total === 0 ? 
        (null) : 
        (
        <Pressable style={{
              backgroundColor: "#088F8F",
              padding: 10,
              marginBottom: 40,
              margin: 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent:"space-between"}}>

        <View>

          <Text style={{fontSize:17,fontWeight:"600",color:"white"}} >{carts.length} items | $ {total}</Text>
          <Text style={{fontSize:15,fontWeight:"400",color:"white",marginVertical:6}}>extra charges might apply</Text>

        </View>

        <Pressable onPress={() => navigation.navigate('PickUp')}>

          <Text  style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pick up</Text>

        </Pressable>

      </Pressable>
      )
      }
      

      
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})