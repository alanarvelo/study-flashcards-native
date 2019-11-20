import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { green, lightPurp, gray } from '../../utils/colors'

export default function Deck ({ deck, style = {} }) {
  return (
    <View style={[styles.boxBasics, style]}>
        <Text style={styles.title}>
          {deck.title ? deck.title : ''}
        </Text>
        <Text style={styles.regular}>
          {`${deck.questions ? deck.questions.length : '0' } cards`}
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  regular: {
    fontSize: 16,
    color: gray,
    textAlign: 'center',
  },
  boxBasics : {
    height: 150,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: green,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'rgba(101,157,50, 0.3)',
    alignItems: 'stretch',
    justifyContent: 'center',
  }
})
