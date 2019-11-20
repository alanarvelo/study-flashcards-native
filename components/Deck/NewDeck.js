import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import DeckInputBox from './DeckInputBox'
import { saveDeckTitle } from '../../utils/api'

class NewDeck extends Component {
  redirectTo = (newDeckKey) => {
    this.props.navigation.navigate(
      'DeckScreen',
      {key: newDeckKey}
      )
  }

  render () {
    return (
      <View style={styles.container}>
        <DeckInputBox 
          title={"Title of New Deck: "}
          placeholder={"Parts of the body"}
          buttonConfig={{onPress: saveDeckTitle}}
          redirectTo={this.redirectTo}
          />
      </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NewDeck