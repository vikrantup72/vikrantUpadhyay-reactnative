import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {Divider, Icon} from 'react-native-elements';
import {TextInput} from 'react-native';
import {FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {GetCategory, GetProducts, UploadProducts} from '../redux/MainReducer/MainReducer';
import {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {ToastAndroid} from 'react-native';

const UploadProduct = ({navigation}) => {
  const [title, settitle] = useState();
  const [price, setprice] = useState();
  const [description, setdiscription] = useState();
  const [imagelink, setImagelink] = useState();
  const [Cate, setCate] = useState();
  const [DeveloperEmail, setDeveloperEmail] = useState('vikrantup72@gmail.com');
  const dispatch = useDispatch();
  const {isFetching, isSuccess, CategoryList} = useSelector(
    state => state.UpaymentsData,
  );
  useEffect(() => {
    dispatch(GetCategory());
  }, []);
  const submit = async () => {
    if (title && price && description && imagelink && Cate && DeveloperEmail) {
    await  dispatch(
        UploadProducts({
          title: title,
          price: price,
          description: description,
          imagelink: imagelink,
          Cate: Cate,
          DeveloperEmail: DeveloperEmail,
          navigation: navigation,
        }),
      );
      if(isSuccess){
      //  dispatch(GetProducts())
        navigation.navigate("ProductList")
      }

    } else {
      ToastAndroid.show('All fields are required!', 2000);
    }
  };

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
              Upload Product
            </Text>
          </View>
        }
      />
      <Divider />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 0.8,
            }}>
            <View
              style={{
                width: 40,
                backgroundColor: '#293419',
                borderRadius: 4,
                justifyContent: 'center',
                height: 40,
              }}>
              <Icon
                name="user"
                type="entypo"
                color={'#fff'}
                size={20}
                style={{
                  paddingHorizontal: 6,
                  backgroundColor: '#293419',
                  borderRadius: 100,
                  paddingVertical: 6,
                }}
              />
            </View>
            <TextInput
              placeholder={'Product title'}
              value={title}
              onChangeText={text => settitle(text)}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 0,
                width: '80%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 0.8,
            }}>
            <View
              style={{
                width: 40,
                backgroundColor: '#293419',
                borderRadius: 4,
                justifyContent: 'center',
                height: 40,
              }}>
              <Icon
                name="dollar"
                type="font-awesome"
                color={'#fff'}
                size={20}
                style={{
                  paddingHorizontal: 6,
                  backgroundColor: '#293419',
                  borderRadius: 100,
                  paddingVertical: 6,
                }}
              />
            </View>
            <TextInput
              keyboardType="phone-pad"
              value={price}
              onChangeText={text => setprice(text)}
              placeholder={'Price'}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 0,
                width: '80%',
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 0.8,
            }}>
            <View
              style={{
                width: 40,
                backgroundColor: '#293419',
                borderRadius: 4,
                justifyContent: 'center',
                height: 40,
              }}>
              <Icon
                name="pencil"
                type="entypo"
                color={'#fff'}
                size={20}
                style={{
                  paddingHorizontal: 6,
                  backgroundColor: '#293419',
                  borderRadius: 100,
                  paddingVertical: 6,
                }}
              />
            </View>
            <TextInput
              multiline
              maxLength={700}
              placeholder={'Description'}
              value={description}
              onChangeText={text => setdiscription(text)}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 0,
                width: '80%',
                height: 100,
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 0.8,
            }}>
            <View
              style={{
                width: 40,
                backgroundColor: '#293419',
                borderRadius: 4,
                justifyContent: 'center',
                height: 40,
              }}>
              <Icon
                name="picture"
                type="ant-design"
                color={'#fff'}
                size={20}
                style={{
                  paddingHorizontal: 6,
                  backgroundColor: '#293419',
                  borderRadius: 100,
                  paddingVertical: 6,
                }}
              />
            </View>
            <TextInput
              placeholder={'Image link'}
              value={imagelink}
              onChangeText={text => setImagelink(text)}
              style={{
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 0,
                width: '80%',
              }}
            />
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 20}}>
        <Text
          style={{
            color: '#293419',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 10,
          }}>
          Selected Category:
        </Text>
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
                  setCate(item.name);
                }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    backgroundColor: Cate === item.name ? '#293419' : '#fff',
                    borderRadius: 4,
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{color: Cate === item.name ? '#fff' : '#293419'}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => submit()}
        style={{
          backgroundColor: '#293419',
          //   position: 'absolute',
          //   bottom: 40,
          marginTop: 40,
          alignSelf: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 4,
        }}>
        {isFetching ? (
          <ActivityIndicator size={'small'} color={'#fff'} />
        ) : (
          <Text style={{color: '#fff', fontSize: 16, fontWeight: '600'}}>
            Add Product
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default UploadProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
