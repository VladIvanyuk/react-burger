import { NavLink } from "react-router-dom";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks/hooks";

export const AppHeader: React.FC = () => {
  const user = useSelector((store) => store.user?.user);
  return (
    <header className={`${styles.header} pt-4 pb-4 mb-10`}>
      <nav className={styles.nav}>
        <NavLink to="/" className={`${styles.navItem} p-5`}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default text_color_inactive pl-2">
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink to='/feed' type="button" className={`${styles.navItem} p-5 mr-30`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </NavLink>
        <Logo />
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? "active" : ""} p-5`
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <p className="text text_type_main-default text_color_inactive pl-2">
                {user?.name ? user?.name : 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
