import { createAction } from "@reduxjs/toolkit";

export const connectProfileFeed = createAction<string, 'PROFILE_FEED_CONNECT'>('PROFILE_FEED_CONNECT');
export const disconnectProfileFeed = createAction('PROFILE_FEED_DISCONNECT');
export const wsConnectingProfileFeed = createAction('PROFILE_FEED_WS_CONNECTING');
export const wsOpenProfileFeed = createAction('PROFILE_FEED_WS_OPEN');
export const wsCloseProfileFeed = createAction('PROFILE_FEED_WS_CLOSE');
export const wsMessageProfileFeed = createAction<any, 'PROFILE_FEED_WS_MESSAGE'>('PROFILE_FEED_WS_MESSAGE');
export const wsErrorProfileFeed = createAction<string, 'PROFILE_FEED_WS_ERROR'>('PROFILE_FEED_WS_ERROR');

export type TFeedActions = 
| ReturnType<typeof connectProfileFeed>
| ReturnType<typeof disconnectProfileFeed>
| ReturnType<typeof wsConnectingProfileFeed>
| ReturnType<typeof wsOpenProfileFeed>
| ReturnType<typeof wsCloseProfileFeed>
| ReturnType<typeof wsMessageProfileFeed>
| ReturnType<typeof wsErrorProfileFeed>