import {
    deleteOrderDetailsAction,
  getOrderDetailsAction,
  getOrderDetailsFailedAction,
  getOrderDetailsSuccesAction,
} from "../services/actions/orderDetails";
import {
  orderDetails,
  orderDetailsIState,
} from "../services/reducers/orderDetails";

describe("Тестирование редьюсера деталей заказа", () => {
  const mockedOrderState = {
    success: true,
    name: "Space краторный бургер",
    order: {
      ingredients: [
        {
          _id: "643d69a5c3f7b9001cfa093c",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
        {
          _id: "643d69a5c3f7b9001cfa0943",
          name: "Соус фирменный Space Sauce",
          type: "sauce",
          proteins: 50,
          fat: 22,
          carbohydrates: 11,
          calories: 14,
          price: 80,
          image: "https://code.s3.yandex.net/react/code/sauce-04.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
          image_large:
            "https://code.s3.yandex.net/react/code/sauce-04-large.png",
          __v: 0,
        },
        {
          _id: "643d69a5c3f7b9001cfa093c",
          name: "Краторная булка N-200i",
          type: "bun",
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_mobile:
            "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          __v: 0,
        },
      ],
      _id: "64db074582e277001bfa91b6",
      owner: {
        name: "Vlad Ivanyuk",
        email: "vl.ivanyuk1994@gmail.com",
        createdAt: "2023-06-22T04:47:19.046Z",
        updatedAt: "2023-07-03T23:31:11.249Z",
      },
      status: "done",
      name: "Space краторный бургер",
      createdAt: "2023-08-15T05:04:05.769Z",
      updatedAt: "2023-08-15T05:04:05.989Z",
      number: 16732,
      price: 2590,
    },
  };

  it("При запросе getOrderDetailsAction за деталями заказа, isOrderLoaded и isOrderError должны устанавливаться в в false", () => {
    const result = orderDetails(orderDetailsIState, getOrderDetailsAction());
    expect(result).toEqual({
      ...orderDetailsIState,
      isOrderLoaded: false,
      isOrderError: false,
    });
  });

  it("При получении деталей заказа(getOrderDetailsSuccesAction), информация должна записываться в хранилище", () => {
    const result = orderDetails(
      orderDetailsIState,
      getOrderDetailsSuccesAction(mockedOrderState)
    );

    expect(result).toEqual({
        ...orderDetailsIState,
        details: mockedOrderState,
        isOrderLoaded: true,
    });
  });

  it("Если запрос за заказом неудачный, должен вернуться изначальный стейт и isOrderError должно быть true", () => {
    const result = orderDetails(orderDetailsIState, getOrderDetailsFailedAction());
    expect(result).toEqual({
        ...orderDetailsIState,
        isOrderError: true
    })
  })

  it("При закрытии модалки с заказом, стейт должен вернуться в изначальное состояние", () => {
    const result = orderDetails(mockedOrderState, deleteOrderDetailsAction());
    expect(result).toEqual(orderDetailsIState)
  })
});
