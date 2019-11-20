import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import TextButton from '../TextButton'
import Deck from '../Deck/Deck'
import * as color from '../../utils/colors'
import { getDeck } from '../../utils/api'
import { withNavigation, NavigationEvents } from 'react-navigation';

class DeckScreen extends Component {
  state = {
    deck: {}
  }

  componentDidMount() {
    this.getDeckData()
  }

  getDeckData = () => {
    getDeck(this.props.navigation.getParam('key'))
      .then((deck) => {
      this.setState({ deck })
    })
  }
  
  addCard = () => {
    const { title } = this.state.deck
    // Redirect to New Card Screen
    this.props.navigation.navigate(
      'NewCard',
      {key: title}
      )
  }

  startQuiz = () => {
    const { title } = this.state.deck
    // Redirect to Quiz Screen
    this.props.navigation.navigate(
      'Quiz',
      {key: title}
      )
  }

  render () {
    const deck = this.state.deck
    return (
      <View style={styles.container}>
          <NavigationEvents onDidFocus={() => this.getDeckData()}/>
          <Deck deck={deck} style={{backgroundColor: color.white}}/>
          <TextButton children="Add Card" onPress={this.addCard} style={styles.buttons} />
          <TextButton children="Start Quiz" onPress={this.startQuiz} style={styles.buttons} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttons: {
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: color.red,
    padding: 5,
    margin:20,
  },
})

export default withNavigation(DeckScreen)

