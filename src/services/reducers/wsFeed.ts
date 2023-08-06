import { createReducer } from "@reduxjs/toolkit"
import { TFeedData, WebsocketStatus } from "../types/types"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/wsFeed"

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

export const feedReducer = createReducer(initialState, builder => {
    builder
        .addCase(wsConnecting, state => {
            state.status = WebsocketStatus.CONNECTING 
        })
        .addCase(wsOpen, state => {
            state.status = WebsocketStatus.ONLINE
        })
        .addCase(wsClose, state => {
            state.status = WebsocketStatus.OFFLINE
        })
        .addCase(wsError, (state, action) => {
            state.connectingError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.data = action.payload
        })
})