import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { green, lightPurp, gray } from '../../utils/colors'
import TextButton from '../TextButton'

export default class Question extends Component {
  state = {
    qtnSide: true
  }

  flipCard = () => {
    this.setState((prevState) => ({qtnSide: !prevState.qtnSide}) )
  }

  render () {
    const { qtnSide } = this.state
    const { qtn } = this.props

    if (this.props.qtn === undefined) {
      return <View></View>
    }
    
    return (
      <View style={styles.boxBasics}>
        <Text style={styles.title}>
          {qtnSide ? "Question:" : "Answer:"}
        </Text>
        <Text style={styles.regular}>
          {qtnSide ? qtn.question : qtn.answer}
        </Text>
        <TextButton children={qtnSide ? 'Answer' : 'Question'} onPress={this.flipCard} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    width: 200,
    textAlign: 'center',
  },
  regular: {
    fontSize: 22,
    color: gray,
    textAlign: 'center',
  },
  boxBasics : {
    height: 250,
    margin: 20,
    alignItems: 'stretch',
    justifyContent: 'space-around',
  }
})