import { NavLink, Outlet } from "react-router-dom";
import { AppHeader } from "../../components/app-header/app-header";
import styles from "./profile-page.module.css";
import { logoutUser } from "../../services/actions/user";
import { TDispatchActions } from "../../services/types/types";
import { useDispatch } from "../../services/hooks/hooks";

export const ProfilePage: React.FC = () => {
  const dispatch: TDispatchActions = useDispatch();
  return (
    <>
      <AppHeader />
      <main className={`${styles.profile} container pt-15`}>
        <div className="mr-15">
          <NavLink to="/profile" end className={`${styles.navItem} p-5`}>
            <p
              className={`text text_type_main-medium text_color_inactive pl-2`}
            >
              Профиль
            </p>
          </NavLink>
          <NavLink to="orders" className={`${styles.navItem} p-5`}>
            <p className="text text_type_main-medium text_color_inactive pl-2">
              История заказов
            </p>
          </NavLink>
          <NavLink
            to="/"
            className={`${styles.navItem} p-5`}
            onClick={() => dispatch(logoutUser())}
          >
            <p className="text text_type_main-medium text_color_inactive pl-2">
              Выход
            </p>
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};
