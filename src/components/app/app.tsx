import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route";
import { Login } from "../../pages/authorization/login";
import { Register } from "../../pages/authorization/register";
import { ForgotPassword } from "../../pages/authorization/forgot-password";
import { ResetPassword } from "../../pages/authorization/reset-password";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import styles from "./app.module.css";
import { useEffect } from "react";
import { initialAuth } from "../../services/actions/user";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";
import { Page404 } from "../../pages/404/404";
import { ProfileReset } from "../profile-reset/profile-reset";
import { OrdersList } from "../orders-list/orders-list";
import {
  TDispatchActions,
  TLocation,
} from "../../services/types/types";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { FeedPage } from "../../pages/feed-page/feed-page";
import { OrderPage } from "../../pages/order-page/order-page";
import { Order } from "../order/order";

export const App: React.FC = () => {
  const location: TLocation = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const dispatch: TDispatchActions = useDispatch();
  const background: TLocation | null =
    location.state && location.state.background;
  const data = useSelector((store) => store.burgerIngredients.data);
  

  const handleModalClose = (): void => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  useEffect(() => {
    // первоначальная проверка авторизации при входе на страницу
    dispatch(initialAuth());
  }, [dispatch]);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getBurgerIngredients());
    }
  }, [data, dispatch]);

  return (
    <div className={styles.app}>
      <Routes location={background || location}>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/feed/:id" element={<OrderPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile/orders/:id" element={<OrderPage />} />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        >
          <Route path="" element={<ProfileReset />} />
          <Route path="orders" element={<OrdersList />} />
        </Route>
        <Route
          path="/login"
          element={<OnlyUnAuth component={<Login />} />}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={
            <OnlyUnAuth component={<ForgotPassword />} />
          }
        />
        <Route
          path="/reset-password"
          element={
            <OnlyUnAuth component={<ResetPassword />} />
          }
        />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal onShowModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            element={
              <Modal onShowModal={handleModalClose}>
                <Order />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal onShowModal={handleModalClose}>
                <Order />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
