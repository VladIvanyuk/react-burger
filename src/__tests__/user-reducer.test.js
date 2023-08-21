import {
    deleteUserAction,
  getUserAction,
  registerUserAction,
  setUserAction,
} from "../services/actions/user";
import { user, userReducerIState } from "../services/reducers/user";

describe("Тестирование редьюсера пользователя", () => {
  const mockedUserRes = {
    success: true,
    user: {
      email: "test@mail.ru",
      name: "test",
    },
    accessToken:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGRhODUzODJlMjc3MDAxYmZhOTY1OSIsImlhdCI6MTY5MjI0ODE0NywiZXhwIjoxNjkyMjQ5MzQ3fQ.ZwozQGKTWMljCVUuVxAGHNFjtB4pA2pCHGtefRrxVPU",
    refreshToken:
      "35996d2fbf039b2ed76f7dea4a38e9535e5c5026fd52c7c9feb56e882820f414ea764c52c844e513",
  };

  it("Данные нового зарегистрированного пользователя должны записываться в хранилище", () => {
    const result = user(userReducerIState, registerUserAction(mockedUserRes));

    expect(result).toEqual({
      ...userReducerIState,
      user: {
        email: "test@mail.ru",
        name: "test",
      },
    });
  });

  it("Данные пользователя при авторизации записываются в хранилище", () => {
    const result = user(userReducerIState, setUserAction(mockedUserRes));

    expect(result).toEqual({
      ...userReducerIState,
      user: {
        email: "test@mail.ru",
        name: "test",
      },
    });
  });

  it("При заходе на страницу, если пользователь авторизирован, его данные записываются в хранилище", () => {
    const result = user(userReducerIState, getUserAction(mockedUserRes));

    expect(result).toEqual({
      ...userReducerIState,
      user: {
        email: "test@mail.ru",
        name: "test",
      },
    });
  });

  it("При выходе из профился, данные пользователя удаляются", () => {
    const result = user(userReducerIState, deleteUserAction(mockedUserRes));

    expect(result).toEqual({
      ...userReducerIState,
      user: null,
    });
  });
});
