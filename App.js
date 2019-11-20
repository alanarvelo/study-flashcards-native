import React from 'react';
import { StyleSheet, View } from 'react-native';
import { initializeSampleDecks, setLocalNotification } from './utils/api'
import Navigator from './components/Navigator'

export default class App extends React.Component {
  componentDidMount() {
    initializeSampleDecks()
    setLocalNotification()
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
