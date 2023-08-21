import { disconnectPublicFeed, wsClosePublicFeed, wsConnectingPublicFeed, wsErrorPublicFeed, wsMessagePublicFeed, wsOpenPublicFeed } from "../services/actions/wsPublicFeed";
import { profileOrdersFeed } from "../services/reducers/wsProfileFeed";
import { publicOrdersFeed } from "../services/reducers/wsPublicFeed";
import { wsPublicFeedIState } from "../services/reducers/wsPublicFeed"
import { WebsocketStatus } from "../services/types/types";

describe('Тестирование редьюсера вебсокета личной ленты заказов', () => {
    it('Вебсокет должен успешно подключаться и записывать флаг подключения в стейт', () => {
        const result = publicOrdersFeed(wsPublicFeedIState, wsConnectingPublicFeed);
        expect(result).toEqual({
            ...wsPublicFeedIState,
            status: WebsocketStatus.CONNECTING
        })
    })
    
    it('Вебсокет должен успешно открываться и записывать флаг открытия в стейт', () => {
        const result = publicOrdersFeed(wsPublicFeedIState, wsOpenPublicFeed);
        expect(result).toEqual({
            ...wsPublicFeedIState,
            status: WebsocketStatus.ONLINE
        })
    })
    
    it('Вебсокет должен успешно закрываться и записывать флаг закрытия в стейт', () => {
        const result = profileOrdersFeed(wsPublicFeedIState, wsClosePublicFeed);
        expect(result).toEqual({
            ...wsPublicFeedIState,
            status: WebsocketStatus.OFFLINE
        })
    })
    
    it('При дисконнекте статус вебсокета в хранилище должен меняться на OFFLINE', () => {
        const result = publicOrdersFeed(wsPublicFeedIState, disconnectPublicFeed);
        expect(result).toEqual({
            ...wsPublicFeedIState,
            status: WebsocketStatus.OFFLINE
        })
    })

    it('Текст ошибки подключения к вебсокету должен записываться в хранилище', () => {
        const errMessage = 'Error!';
        const result = publicOrdersFeed(wsPublicFeedIState, wsErrorPublicFeed(errMessage));
        expect(result).toEqual({
            ...wsPublicFeedIState,
            connectingError: errMessage
        })
    })

    it('Информация о ленте заказов должна записыватьс я в хранилище', () => {
        const mockedFeed = {
            "success": true,
            "orders": [
                {
                    "_id": "64db040282e277001bfa91b0",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0943",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Space флюоресцентный бургер",
                    "createdAt": "2023-08-15T04:50:10.930Z",
                    "updatedAt": "2023-08-15T04:50:11.190Z",
                    "number": 16729
                },
                {
                    "_id": "64db053a82e277001bfa91b3",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0943",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Space флюоресцентный бургер",
                    "createdAt": "2023-08-15T04:55:22.546Z",
                    "updatedAt": "2023-08-15T04:55:22.755Z",
                    "number": 16730
                },
                {
                    "_id": "64db06ac82e277001bfa91b4",
                    "ingredients": [
                        "643d69a5c3f7b9001cfa093d",
                        "643d69a5c3f7b9001cfa0942",
                        "643d69a5c3f7b9001cfa093d"
                    ],
                    "status": "done",
                    "name": "Флюоресцентный spicy бургер",
                    "createdAt": "2023-08-15T05:01:32.540Z",
                    "updatedAt": "2023-08-15T05:01:32.739Z",
                    "number": 16731
                },
            ],
            "total": 16872,
            "totalToday": 114
        }
        const result = publicOrdersFeed(wsPublicFeedIState, wsMessagePublicFeed(mockedFeed));
        expect(result).toEqual({
            ...wsPublicFeedIState,
            data: mockedFeed
        })
    })
})