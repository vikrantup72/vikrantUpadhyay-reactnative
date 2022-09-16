import { StyleSheet} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import ScreenNavigation from './Navigation/ScreenNavigation'

const Main = () => {
  return (
    <NavigationContainer>
      <ScreenNavigation/>
    </NavigationContainer>
  )
}

export default Main

const styles = StyleSheet.create({})