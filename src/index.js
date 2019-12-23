import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {dateReducer} from './modules/Calendar/_reducer'
import {tasksReducer} from './modules/ToDoList/_reducer'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk';

const mainReducer = combineReducers({
    dateReducer,
    tasksReducer
});
const store = createStore(
    mainReducer,
    applyMiddleware(thunkMiddleware)
    // loggerMiddleware // neat middleware that logs actions
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
