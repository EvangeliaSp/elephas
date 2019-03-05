import { createStore } from 'redux';
import { configureAuthentication } from 'redux-mad-authentication';

export const store = createStore(
    rootReducer,
);

configureAuthentication({
// The URL of your Spring back-end where the user can login (POST) and logout(DELETE)
    authenticationUrl: '/api/authentication',

    // The URL of your Spring back-end where the current user can be requested via GET
    currentUserUrl: '/api/authentication/current',

    // The route (in the front-end) the user should be redirected to when not logged in.
    loginRoute: '/login',

    // A reference to the dispatch function for the react store.
    dispatch: store.dispatch,

    // A function which returns the current 'authentication' store
    authenticationStore: () => store.getState().authentication

});