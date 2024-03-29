import { createReducer } from "@reduxjs/toolkit"
import { TFeedData, WebsocketStatus } from "../types/types"
import { wsCloseProfileFeed, wsConnectingProfileFeed, wsErrorProfileFeed, wsMessageProfileFeed, wsOpenProfileFeed } from "../actions/wsProfileFeed"
import { disconnectPublicFeed } from "../actions/wsPublicFeed"

export type TFeedState = {
    status: WebsocketStatus,
    connectingError: string,
    data: TFeedData
}

export const wsProfileFeedIState: TFeedState = {
    status: WebsocketStatus.OFFLINE,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    connectingError: ''
}

export const profileOrdersFeed = createReducer(wsProfileFeedIState, builder => {
    builder
        .addCase(wsConnectingProfileFeed, state => {
            state.status = WebsocketStatus.CONNECTING 
        })
        .addCase(wsOpenProfileFeed, state => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsCloseProfileFeed, state => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsErrorProfileFeed, (state, action) => {
            state.connectingError = action.payload
        })
        .addCase(wsMessageProfileFeed, (state, action) => {
            state.data = action.payload
        })
        .addCase(disconnectPublicFeed, state => {
            state.status = WebsocketStatus.OFFLINE
        })
})