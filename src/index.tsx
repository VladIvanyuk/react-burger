import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import {  BrowserRouter as Router } from 'react-router-dom';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: any = {
  burgerIngredients: {},
  burgerConstructor: {
    buns: {},
    ingredients: [],
  }
    
  ,
  ingredientDetails: {},
  orderDetails: {
    details: {
      order: {
        number: '',
      }
    },
    isOrderError: false,
    isOrderLoaded: false,
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, initialState, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
