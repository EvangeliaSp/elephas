import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

const reducers = {
    // ... your other reducers here ...
    session: sessionReducer
};
const reducer = combineReducers(reducers);