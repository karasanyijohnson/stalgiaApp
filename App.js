import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';


import authReducer from './store/reducers/Auth';
import groupReducer from './store/reducers/Groups';
import chaptersReducer from './store/reducers/Chapters';
import postsReducer from './store/reducers/Posts'
import postReducer from './store/reducers/Post'
import AppNavigator from './navigation/AppNavigation'

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupReducer,
  chapters:chaptersReducer,
  posts:postsReducer,
  post: postReducer
  

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}
