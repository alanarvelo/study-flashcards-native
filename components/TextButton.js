import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, black } from '../utils/colors'


export default function TextButton ({ children="Submit", onPress={}, style={} }) {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <Text style={[styles.reset, style]} >{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  reset: {
    textAlign: 'center',
    color: purple,
    fontWeight: 'bold',
    fontSize: 17,
    // textShadowColor: black
  },
})