// @flow

import { combineReducers } from 'redux';

import type { AuthenticationStore } from 'redux-mad-authentication';
import { authentication } from 'redux-mad-authentication';

export type Store = {
    authentication: AuthenticationStore
};

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer: Store = combineReducers({
    authentication,
});

export default rootReducer;