import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import Header from './Header';
import {Avatar, Card, Divider, Icon, ListItem} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {GetProductsById} from '../redux/MainReducer/MainReducer';
import {Image} from 'react-native';
import {ScrollView} from 'react-native';
import {iteratorSymbol} from 'immer/dist/internal';
import { ActivityIndicator } from 'react-native';

const width = Dimensions.get('window').width;
const ProductDetails = ({navigation, route}) => {
  const {id} = route.params;
  console.log(id);
  const dispatch = useDispatch();
  const {isFetching, ProductDetails} = useSelector(
    state => state.UpaymentsData,
  );
  useEffect(() => {
    dispatch(GetProductsById(id));
  }, []);
  return (
    <View style={styles.container}>
      <Header
        left={
          <View
            style={{
              marginVertical: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              name="arrowleft"
              type="ant-design"
              onPress={() => navigation.goBack()}
            />
            <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
              {' '}
              Product Details
            </Text>
          </View>
        }
      />
      <Divider />
{isFetching ? <ActivityIndicator size={'large'} color={'#293419'} /> :     <>
      <View style={{marginBottom:20}}>
        <Image
          source={{uri: ProductDetails.avatar}}
          resizeMode={'cover'}
          style={{
            width: width / 1 - 30,
            height: 220,
            borderRadius: 12,
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
      </View>

      <View
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#293419',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          flex: 1,
        }}>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
            }}>
            <Text style={{color: '#fff', fontSize: 24, fontWeight: '600'}}>
              {ProductDetails.name}
            </Text>
            <Text style={{color: '#fff', fontSize: 24, fontWeight: '600'}}>
              ${ProductDetails.price}
            </Text>
          </View>
          <Divider style={{paddingTop:10}} />
          <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal: 15}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '400',
                marginTop: 25,
                lineHeight: 20,
              }}>
              {ProductDetails.description}
            </Text>
          </ScrollView>
        </View>
      </View>
      </>}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
