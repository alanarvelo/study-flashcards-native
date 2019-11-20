import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import TextButton from '../TextButton'
import * as color from '../../utils/colors'


class DeckInputBox extends Component {
  state = {
    text: ''
  }

  handleChange =  (text) => {
    this.setState({text})
  }

  handleSubmit = async () => {
    const { buttonConfig, redirectTo } = this.props
    await buttonConfig.onPress(this.state.text)
    redirectTo(this.state.text)
    this.setState({text: ''})
  }

  render() {
    const { title, placeholder, style={} } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          onChangeText={(text) => this.handleChange(text)}
          value={this.state.text}
        />
        <TextButton  
          style={styles.buttons}
          onPress={this.handleSubmit}
          children={"Create Deck"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10
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
    marginBottom: 15,
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

export default DeckInputBox