import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Deck from './Deck'
import { getDecks } from '../../utils/api.js'
import { green } from '../../utils/colors'
import { NavigationEvents } from 'react-navigation';

export default class DeckList extends Component {
  state = {
    decks: {},
  }

  componentDidMount() {
    this.getDecksData()
  }

  getDecksData = () => {
    getDecks()
    .then((decks) => {
      this.setState({ decks })
    })
  }

  viewDeckScreen = (key) => {
    console.log(key)
    this.props.navigation.navigate('DeckScreen', {key: key})
  }
  
  render() {
    const { decks} = this.state

    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getDecksData()}/>
          {Object.keys(decks).map((key) => {
            return (
              <TouchableOpacity key={key} value={key} onPress={() => this.viewDeckScreen(key)}>
                <Deck key={key} deck={decks[key]} />
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  }
})