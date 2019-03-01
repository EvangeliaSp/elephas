// server.js
import { sessionService, sessionReducer } from 'redux-react-session';
import { combineReducers, createStore } from 'redux';

// ...
app.use((req, res) => {
    const reducer = combineReducers({
        session: sessionReducer
    });
    // Create a new Redux store instance
    const store = createStore(reducer);

    sessionService.initServerSession(store, req);
    // ...
}
// ...