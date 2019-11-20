import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CardInputBox from '../Card/CardInputBox'
import { addCardToDeck } from '../../utils/api'

// 

class NewCard extends Component {
  deckKey = this.props.navigation.getParam('key')

  redirectTo = () => {
    this.props.navigation.navigate(
      'DeckScreen',
      {key: this.deckKey}
      )
  }

  render() {
    return (
      <View style={styles.container}>
        <CardInputBox 
          buttonConfig={{onPress: addCardToDeck, deckKey: this.deckKey}}
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

export default NewCard
