import { AsyncStorage } from 'react-native'
import sampleDecks from './_sampleDecks'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const DECKS_STORAGE_KEY = 'study-flashcards:decks'
const NOTIFICATIONS_KEY = "study-flashcards:notifications"

export async function initializeSampleDecks () {
  try {
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(sampleDecks))
  } catch (e) {
    console.warn("Error initialzing sample decks: ", e)
  }
}

export async function getDecks () {
  try {
    let result =  await AsyncStorage.getItem(DECKS_STORAGE_KEY)
    return JSON.parse(result)
  } catch (e) {
    console.warn("Error getting all decks: ", e)
  }
}

export async function getDeck (key) {
  try {
    const decks = await getDecks()
    if (!Object.keys(decks).includes(key)) throw new Error("No deck found for that key")
    return decks[key]
  } catch (e) {
    console.warn("Error getting all decks: ", e)
  }
}

export async function saveDeckTitle (key) {
  try {
    const decks = await getDecks()
    if (Object.keys(decks).includes(key)) throw new Error("A deck with that key already exists")
    decks[key] = {title: key, questions: []}
    console.log(decks)
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  } catch (e) {
    console.warn("Error getting all decks: ", e)
  }
}

export async function addCardToDeck (key, qtnText, ansText) {
  try {
    const decks = await getDecks()
    if (!Object.keys(decks).includes(key)) throw new Error("No deck found for that key")
    decks[key].questions.push({question: qtnText, answer: ansText})
    console.log(decks)
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  } catch (e) {
    console.warn("Error getting all decks: ", e)
  }
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification () {
  return {
    title: 'Learning takes practice!',
    body: "👋 don't forget to take a quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'medium',
      sticky: false,
      vibrate: false,
    }
  }
  
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(), 
                { time: tomorrow, repeat: 'day'}
              )

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
            }
          })
      }
    })
}


