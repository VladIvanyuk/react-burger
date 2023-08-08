import { createAction } from "@reduxjs/toolkit";

export const connectPublicFeed = createAction<string, 'PUBLIC_FEED_CONNECT'>('PUBLIC_FEED_CONNECT');
export const disconnectPublicFeed = createAction('PUBLIC_FEED_DISCONNECT');
export const wsConnectingPublicFeed = createAction('PUBLIC_FEED_WS_CONNECTING');
export const wsOpenPublicFeed = createAction('PUBLIC_FEED_WS_OPEN');
export const wsClosePublicFeed = createAction('PUBLIC_FEED_WS_CLOSE');
export const wsMessagePublicFeed = createAction<any, 'PUBLIC_FEED_WS_MESSAGE'>('PUBLIC_FEED_WS_MESSAGE');
export const wsErrorPublicFeed = createAction<string, 'PUBLIC_FEED_WS_ERROR'>('PUBLIC_FEED_WS_ERROR');

export type TFeedActions = 
| ReturnType<typeof connectPublicFeed>
| ReturnType<typeof disconnectPublicFeed>
| ReturnType<typeof wsConnectingPublicFeed>
| ReturnType<typeof wsOpenPublicFeed>
| ReturnType<typeof wsClosePublicFeed>
| ReturnType<typeof wsMessagePublicFeed>
| ReturnType<typeof wsErrorPublicFeed>