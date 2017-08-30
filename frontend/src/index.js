import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import {BrowserRouter} from "react-router-dom";
import {MuiThemeProvider} from "material-ui";
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from "redux-thunk"
import reducer from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(logger, thunk)
    )
)

ReactDOM.render(
    <BrowserRouter>
        <MuiThemeProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
