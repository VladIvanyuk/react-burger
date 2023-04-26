import styles from "./AppHeader.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = (props) => {
  return (
      <nav className={styles.nav}>
        <button type="button" className={`${styles.navItem} p-5`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </button>
        <button type="button" className={`${styles.navItem} p-5 mr-30`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Лента заказов</p>
        </button>
        <Logo />
        <button type="button" className={`${styles.navItem} p-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
        </button>
      </nav>
  );
};
