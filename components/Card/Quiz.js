import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TextButton from '../TextButton'
import { getDeck, clearLocalNotification, setLocalNotification } from '../../utils/api'
import Question from './Question'
import * as color from '../../utils/colors'

export default class Quiz extends Component {
  state = {
    title: "",
    questions: [],
    counter: 0,
    score: 0
  }

  componentDidMount() {
    getDeck(this.props.navigation.getParam('key'))
      .then((deck) => {
        this.setState({
          title: deck.title, 
          questions: deck.questions
        })
    })
  }

  handleCorrectAnswer = () => {
    this.setState((prv) => ({
      counter: ++prv.counter,
      score: ++prv.score,
    }))
  }

  handleIncorrectAnswer = () => {
    this.setState((prv) => ({
      counter: ++prv.counter,
    }))
  }

  render () {
    const { title, questions, counter, score } = this.state

    if (questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 20, textAlign: 'center', margin:20}}>
            Can't quiz on a deck with 0 cards. Add a card to start learning.
          </Text>
        </View>
      )
    }
    
    if (counter === questions.length) {
      clearLocalNotification()
        .then(setLocalNotification)
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>
            {`You got ${score}/${questions.length} correct answers`}
          </Text>
          <TextButton 
            children={"Restart Quiz"} 
            onPress={() => this.setState(() => ({counter: 0, score: 0}) )}
          />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Text style={{marginLeft: 30}}>
          {`${counter+1}/${questions.length}`}
        </Text>
        <Question qtn={questions[counter]} />
        <TextButton 
          children={"Correct"} 
          onPress={this.handleCorrectAnswer} 
          style={styles.correctButton}
        />
        <TextButton 
          children={"Incorrect"} 
          onPress={this.handleIncorrectAnswer} 
          style={styles.incorrectButton}
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
    alignItems: 'stretch',
  },
  correctButton: {
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: color.green,
    backgroundColor: 'rgba(101,157,50, 0.2)',
    color: color.black, //'rgba(101,157,50, 1)',
    padding: 5,
    margin:20,
  },
  incorrectButton: {
    fontSize: 16,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: color.red,
    backgroundColor: 'rgba(183, 24, 69, 0.4)',
    color: color.black, //'rgba(183, 24, 69, 1)',
    padding: 5,
    margin:20,
  },
})