import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/app/app';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const initialState: any = {
  burgerIngredients: {},
  burgerConstructor: {
    buns: {
      // "_id": "643d69a5c3f7b9001cfa093c",
      // "name": "Краторная булка N-200i",
      // "type": "bun",
      // "proteins": 80,
      // "fat": 24,
      // "carbohydrates": 53,
      // "calories": 420,
      // "price": 1255,
      // "image": "https://code.s3.yandex.net/react/code/bun-02.png",
      // "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      // "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
      // "__v": 0
    },
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
    <Provider store={store}>
      <App />
    </Provider>
);
