import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import {
  OnlyAuth,
  OnlyUnAuth,
  ProtectedRouteElement,
} from "../protected-route/protected-route";
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
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";
import { Page404 } from "../../pages/404/404";

export const App = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state && location.state.background;
  const { data } = useSelector((store) => store.burgerIngredients);

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };
  console.log("render");
  useEffect(() => {
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
        <Route
          path="/"
          element={<MainPage />} />
        <Route
          path="/profile"
          element={<OnlyAuth component={<ProfilePage />} />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path="/ingredients/:ingredientId" 
          element={<IngredientPage />} />
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
        </Routes>
      )}
    </div>
  );
};
