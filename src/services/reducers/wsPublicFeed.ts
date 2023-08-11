import { createReducer } from "@reduxjs/toolkit"
import { TFeedData, WebsocketStatus } from "../types/types"
import { disconnectPublicFeed, wsClosePublicFeed, wsConnectingPublicFeed, wsErrorPublicFeed, wsMessagePublicFeed, wsOpenPublicFeed } from "../actions/wsPublicFeed"

export type TFeedState = {
    status: WebsocketStatus,
    connectingError: string,
    data: TFeedData
}

const initialState: TFeedState = {
    status: WebsocketStatus.OFFLINE,
    data: {
        success: false,
        orders: [],
        total: 0,
        totalToday: 0
    },
    connectingError: ''
}

export const publicOrdersFeed = createReducer(initialState, builder => {
    builder
        .addCase(wsConnectingPublicFeed, state => {
            state.status = WebsocketStatus.CONNECTING 
        })
        .addCase(wsOpenPublicFeed, state => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClosePublicFeed, state => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsErrorPublicFeed, (state, action) => {
            state.connectingError = action.payload
        })
        .addCase(wsMessagePublicFeed, (state, action) => {
            state.data = action.payload
        })
        .addCase(disconnectPublicFeed, state => {
            state.status = WebsocketStatus.OFFLINE
        })
})