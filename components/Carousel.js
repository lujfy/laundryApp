import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
    const images = [
        'https://i.pinimg.com/564x/ff/26/80/ff2680d6394a238cc9ae15c25592a0d3.jpg' ,
        'https://i.pinimg.com/564x/f4/3f/b6/f43fb6a2cd2ed811fff611d78d02f0ad.jpg' ,
    ]
  return (
    <View>
      <SliderBox 
      images={images} 
      autoPlay 
      circleLoop 
      dotColor={'#13274F'} 
      inactiveDotColor='#90A4AE'
      ImageComponentStyle={{
        borderRadius : 6 ,
        width : '94%' ,
      }}
      />
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({})