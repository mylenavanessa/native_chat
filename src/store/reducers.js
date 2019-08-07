import { combineReducers } from 'redux';
import messages from '../pages/Chat/store/messages'

const rootReducer = combineReducers({
  messages
});

export default rootReducer;
