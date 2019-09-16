import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import * as reducers from './Reducers';
//use redux dev tools in development
export function getCompose() {
    /** eslint -disable no-process-env, no-underscore-dangle */
    if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
        return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }

    return compose;
}

export const composeEnhancers = (...args) => getCompose()(...args);

export function configureStore(initialState = {}) {
    return createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(reduxThunk), applyMiddleware(reduxPromiseMiddleware))
    );
}

export default configureStore;