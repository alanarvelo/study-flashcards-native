import DeckList from './Deck/DeckList'
import NewDeck from './Deck/NewDeck'

import DeckScreen from './Deck/DeckScreen'
import NewCard from './Card/NewCard'
import Quiz from './Card/Quiz'

import * as color from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native';
import React from 'react';

import { createAppContainer } from 'react-navigation'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'


const Tabs = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />,
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}

const navigationOptions = {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? color.red : color.white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? color.white : color.red,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

const TabNav = createAppContainer(Platform.OS === 'ios'
                                    ? createBottomTabNavigator(Tabs, navigationOptions)
                                    : createMaterialTopTabNavigator(Tabs, navigationOptions))


const Navigator = createAppContainer(createStackNavigator({
  Home: {
    screen: TabNav,
    navigationOptions: {
      header: null,
    },
  },
  DeckScreen: {
    screen: DeckScreen,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.red,
      },
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.red,
      },
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: color.white,
      headerStyle: {
        backgroundColor: color.red,
      },
    }),
  },
}));

export default Navigator