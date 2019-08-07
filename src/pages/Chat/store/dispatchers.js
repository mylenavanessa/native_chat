import { Creators } from './messages';
import firebase from 'firebase'
import moment from 'moment'

export function dispatchWatchMessages(){
  return async dispatch => {
    dispatch(Creators.watchMessages())
    try{
      firebase.database().ref('/messages').on('value', snapshot => {
        let messages = Object.keys(snapshot.val()).map(item => ({ id: item, ...snapshot.val()[item] }))
        dispatch(Creators.watchMessagesSuccess(messages))
      })
    }catch(err){
      dispatch(Creators.watchMessagesError(err))
    }
  }
}

export function dispatchSendMessage(message){
  return async dispatch => {
    dispatch(Creators.sendMessage())
    try{
      const db = firebase.database().ref('/messages')
      await db.push({message})
      dispatch(Creators.sendMessageSuccess())
    }catch(err){
      console.log(err)
      dispatch(Creators.sendMessageError(err))
    }
  }
}

