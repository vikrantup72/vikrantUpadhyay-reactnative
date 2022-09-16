import {StyleSheet, Image, View} from 'react-native';
import React,{useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("ProductList")
    }, 3000);
  },[])
  
  return (
    <View style={styles.container}>
        <Image
          resizeMode='contain'
          source={require('../assets/images/Splashlogo.jpg')}
          style={{width:240}}
        />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
});
