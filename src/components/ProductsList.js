import {
  StyleSheet,
  Image,
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Card, Divider, Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {GetCategory, GetProducts} from '../redux/MainReducer/MainReducer';
import {TouchableOpacity} from 'react-native';
import Header from './Header';
import { ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const ProductsList = ({navigation}) => {
    const focused = useIsFocused()
  const dispatch = useDispatch();
  const {isFetching, isSuccess,isFetchings, ProductList, CategoryList} = useSelector(
    state => state.UpaymentsData,
  );
  useEffect(() =>{
    dispatch(GetProducts());
    dispatch(GetCategory());
  },[]);
  const [filter1, setfilter1] = useState();
  console.log(filter1,"nnnm");
  const [all, setAll] = useState([]);


  const filterData = data => {
    let final = [];
    const Data = ProductList.map(item => {
      item.category === data ? final.unshift(item) : null;
    });
    setfilter1(final);
  };

  const renderItem = ({item}) => {
    return (
      <>
        <View style={{width: '50%'}}>
          <Card
            containerStyle={{
              borderRadius: 4,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}>
            <Avatar
              avatarStyle={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
              source={{uri: item.avatar}}
              size={width / 2.4 + 0.6}
            />
            <Card
              containerStyle={{
                elevation: 6,
                borderRadius: 4,
                paddingHorizontal: 0,
                paddingVertical: 0,
                backgroundColor: '#293419',
                marginHorizontal: 0,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProductDetails',{id: item._id})}>
                <View style={{paddingHorizontal: 6}}>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingVertical: 4,
                      fontWeight: '400',
                      color: '#fff',
                    }}>
                    {item.name.length >= 15
                      ? `${item.name.slice(0, 14)}...`
                      : item.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 4,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#fff',
                      }}>
                      {item.price}
                    </Text>
                    <Icon
                      name="pencil"
                      type="foundation"
                      color={'#A5C9CA'}
                      size={18}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          </Card>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        right={<Icon name="search1" type="ant-design" />}
        img={
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={{width: 140, height: 60}}
          />
        }
      />
      <Divider/>
      <View  style={{flexDirection:'row'}}>
      <TouchableOpacity
                  style={{
                    marginHorizontal: 12,
                    paddingTop: 5,
                    paddingBottom: 15,
                  }}
                  onPress={() => {
                    setfilter1(null),setAll([])
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      backgroundColor: '#293419',
                      borderRadius: 4,
                      borderWidth:1
                    }}>
                    <Text style={{color:'#fff'}}>All</Text>
                  </View>
                </TouchableOpacity>
          <FlatList
            data={CategoryList}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 12,
                    paddingTop: 5,
                    paddingBottom: 15,
                  }}
                  onPress={() => {
                    setAll(item.name), filterData(item.name);
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      backgroundColor: all.includes(item.name)?'#fff':'#293419',
                      borderRadius: 4,
                      borderWidth:1
                    }}>
                    <Text style={{color:all.includes(item.name) ? '#000': '#fff'}}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
      </View>
{isFetchings ? <ActivityIndicator size={'large'} color={'#293419'}/>:       <FlatList
        data={filter1 ? filter1 : ProductList }
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={renderItem}
      />}
      <TouchableOpacity onPress={()=>navigation.navigate("UploadProduct")} style={{backgroundColor:'#293419',position:'absolute',zIndex:999,bottom:10,right:10, width:65,height:65,borderRadius:100,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#fff',fontSize:40}}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
