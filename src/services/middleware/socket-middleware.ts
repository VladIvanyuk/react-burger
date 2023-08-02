import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { connect, disconnect, wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "../actions/wsFeed";

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: any): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;
      console.log(wsActions)
      return next => (action) => {
        const { dispatch } = store;
        const { wsConnecting, onOpen, onError, onMessage, onClose } = wsActions;
        
        if (connect.match(action)) {
          socket = new WebSocket(action.payload);
          dispatch(wsConnecting())
        }

        if (socket) {
          socket.onopen = event => {
            dispatch(onOpen());
          };
  
          socket.onerror = event => {
            dispatch(onError('Error'));
          }; 
  
          socket.onmessage = event => {
            const { data } = event;
            const parsedData = JSON.parse(data);
  
            dispatch(onMessage(parsedData));
          };
  
          socket.onclose = event => {
            dispatch(onClose());
          };

          if(disconnect.match(action)) {
            socket.close()
            socket = null;
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };