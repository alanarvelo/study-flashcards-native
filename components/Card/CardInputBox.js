import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from '../TextButton'
import * as color from '../../utils/colors'


class CardInputBox extends Component {
  state = {
    qtnText: '',
    ansText: ''
  }

  handleSubmit = async () => {
    const { onPress, deckKey } = this.props.buttonConfig
    const { redirectTo } = this.props
    const { qtnText, ansText } = this.state
    if ( qtnText === '' || ansText === '') {
      return
    }
    console.log(deckKey, qtnText, ansText)
    await onPress(deckKey, qtnText, ansText)
    redirectTo()
    this.setState({ qtnText: '', ansText: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {fontSize: 18}]}>
          {"Add New Question & Answer"}
        </Text>

        <Text style={styles.title}>
          Question:
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'type question here'}
          onChangeText={(text) => this.setState({qtnText: text}) }
          value={this.state.text}
        />

        <Text style={styles.title}>
          Answer:
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'type answer here'}
          onChangeText={(text) => this.setState({ansText: text}) }
          value={this.state.text}
        />

        <TextButton 
          style={styles.buttons}
          onPress={this.handleSubmit} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex:.8,
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  input: {
    margin: 3,
    width: 300,
    height: 50,
    borderWidth: 2,
    borderColor: color.red,
    borderRadius: 5,
    padding: 10,
    color: color.black
  },
  title: {

    textAlign: 'center',
    fontWeight: 'bold',
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

export default CardInputBox