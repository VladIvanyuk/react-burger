import { NavLink } from "react-router-dom";
import { AppHeader } from "../../components/app-header/app-header";
import styles from "./profile-page.module.css";
import { ProfileReset } from "../../components/profile-reset/profile-reset";

export const ProfilePage = (props) => {
  return (
    <>
      <AppHeader />
      <main className={`${styles.profile} container pt-15`}>
        <div className='mr-15'>
          <NavLink to="/profile" className={`${styles.navItem} p-5`}>
            {({ isActive }) => (
              <>
                <p
                  className={`${
                    isActive ? "" : " text_color_inactive"
                  } text text_type_main-medium pl-2`}
                >
                  Профиль
                </p>
              </>
            )}
          </NavLink>
          <NavLink to="/" className={`${styles.navItem} p-5`}>
            {({ isActive }) => (
              <>
                <p className="text text_type_main-medium text_color_inactive pl-2">
                  История заказов
                </p>
              </>
            )}
          </NavLink>
          <NavLink to="/" className={`${styles.navItem} p-5`}>
            {({ isActive }) => (
              <>
                <p className="text text_type_main-medium text_color_inactive pl-2">
                  Выход
                </p>
              </>
            )}
          </NavLink>
        </div>
        <div>
          <ProfileReset />
        </div>
      </main>
    </>
  );
};
