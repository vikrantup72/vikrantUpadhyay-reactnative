import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../components/Splash';
import ProductsList from '../components/ProductsList';
import ProductDetails from '../components/ProductDetails';
import UploadProduct from '../components/UploadProduct';

const Stack = createNativeStackNavigator();

function ScreenNavigation() {
  return (
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="ProductList" component={ProductsList} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="UploadProduct" component={UploadProduct} />

      </Stack.Navigator>
  );
}

export default ScreenNavigation;
