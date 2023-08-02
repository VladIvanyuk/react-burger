import { rootReducer } from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

import type {} from 'redux-thunk/extend-redux'

import { 
  connect as FeedWsConnect, 
  disconnect as FeedWsDisconnect,
  wsConnecting as FeedWsConnecting,
  wsOpen as FeedWsOpen,
  wsClose as FeedWsClose,
  wsMessage as FeedWsNessage,
  wsError as FeedWsError 
} from "./actions/wsFeed";

import { socketMiddleware } from "./middleware/socket-middleware";

const wsActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsNessage,
};

const feedMiddleware = socketMiddleware(wsActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedMiddleware),
    devTools: true,
  })