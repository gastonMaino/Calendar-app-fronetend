import { applyMiddleware, compose, createStore } from 'redux';
import Thunk from 'redux-thunk'
import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (process.env.NODE_ENV === "development"
&& typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(Thunk)))