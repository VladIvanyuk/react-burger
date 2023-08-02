import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState } from "../types/types";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";

export type TwsActionTypes = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsDisconnect: ActionCreatorWithoutPayload,
    wsConnecting: ActionCreatorWithoutPayload,
    onOpen: ActionCreatorWithoutPayload,
    onClose: ActionCreatorWithoutPayload,
    onError: ActionCreatorWithPayload<string>,
    onMessage: ActionCreatorWithPayload<any>,
}

export const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
    return ((store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => {
      let socket: WebSocket | null = null;
      
      return next => (action) => {
        const { dispatch } = store;
        const { wsConnect, wsDisconnect, onOpen, onError, onMessage, wsConnecting, onClose } = wsActions;
        
        if (wsConnect.match(action)) {
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

          if(wsDisconnect.match(action)) {
            socket.close()
            socket = null;
          }
        }
  
        next(action);
      };
    }) as Middleware;
  };