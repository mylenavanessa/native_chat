import React from 'react';

import { Provider } from 'react-redux'
import store from './src/store'
import Chat from './src/pages/Chat'

const App = () => {
  return (
   <Provider store={store}>
    <Chat/>
   </Provider>
  );
};


export default App;
