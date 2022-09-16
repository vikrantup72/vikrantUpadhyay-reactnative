import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const Header = (props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
      }}>
      {props?.left}
      {props?.title}
      {props?.img}
      {props?.right}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
