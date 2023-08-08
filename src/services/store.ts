import { rootReducer } from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

import type {} from 'redux-thunk/extend-redux'

import { 
  connectPublicFeed as FeedWsConnect, 
  disconnectPublicFeed as FeedWsDisconnect,
  wsConnectingPublicFeed as FeedWsConnecting,
  wsOpenPublicFeed as FeedWsOpen,
  wsClosePublicFeed as FeedWsClose,
  wsMessagePublicFeed as FeedWsNessage,
  wsErrorPublicFeed as FeedWsError 
} from "./actions/wsPublicFeed";

import { 
  connectProfileFeed as ProfileFeedWsConnect, 
  disconnectProfileFeed as ProfileFeedWsDisconnect,
  wsConnectingProfileFeed as ProfileFeedWsConnecting,
  wsOpenProfileFeed as ProfileFeedWsOpen,
  wsCloseProfileFeed as ProfileFeedWsClose,
  wsMessageProfileFeed as ProfileFeedWsNessage,
  wsErrorProfileFeed as ProfileFeedWsError 
} from "./actions/wsProfileFeed";

import { socketMiddleware } from "./middleware/socket-middleware";

const wsPublicFeedActions = {
  wsConnect: FeedWsConnect,
  wsDisconnect: FeedWsDisconnect,
  wsConnecting: FeedWsConnecting,
  onOpen: FeedWsOpen,
  onClose: FeedWsClose,
  onError: FeedWsError,
  onMessage: FeedWsNessage,
};

const wsProfileFeedActions = {
  wsConnect: ProfileFeedWsConnect,
  wsDisconnect: ProfileFeedWsDisconnect,
  wsConnecting: ProfileFeedWsConnecting,
  onOpen: ProfileFeedWsOpen,
  onClose: ProfileFeedWsClose,
  onError: ProfileFeedWsError,
  onMessage: ProfileFeedWsNessage,
};

const feedMiddleware = socketMiddleware(wsPublicFeedActions);
const profileFeedMiddleware = socketMiddleware(wsProfileFeedActions);

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware),
    devTools: true,
  })