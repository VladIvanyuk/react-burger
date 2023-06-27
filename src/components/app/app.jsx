import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import { ProtectedRouteElement } from "../protected-route/protected-route";
import { Login } from "../../pages/authorization/login";
import { Register } from "../../pages/authorization/register";
import { ForgotPassword } from "../../pages/authorization/forgot-password";
import { ResetPassword } from "../../pages/authorization/reset-password";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import styles from './app.module.css';

export const App = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <Routes location={background || location}>
        <Route
          path="/"
          element={<ProtectedRouteElement element={<MainPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<ProfilePage />} />}
        />
        <Route
          path="/login"
          element={<ProtectedRouteElement element={<Login />} />}
        />
        <Route
          path="/register"
          element={<ProtectedRouteElement element={<Register />} />}
        />
        <Route
          path="/forgot-password"
          element={<ProtectedRouteElement element={<ForgotPassword />} />}
        />
        <Route
          path="/reset-password"
          element={<ProtectedRouteElement element={<ResetPassword />} />}
        />
        <Route
          path="/ingredients/:ingredientId"
          element={<ProtectedRouteElement element={<IngredientPage />} />}
        />
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
