// client.js
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';

const store = createStore(reducer)

initSessionService(store, { driver: 'COOKIES' });