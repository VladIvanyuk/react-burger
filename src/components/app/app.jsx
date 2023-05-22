import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";

export const App = (props) => {

  const { isLoaded, isError } = useSelector((store) => store.burgerIngredients);
  const dispatch = useDispatch();

  // получаем список ингредиентов
  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  return (
      <div className={styles.app}>
        {isLoaded && (
          <>
            <header className="pt-4 pb-4 mb-10">
              <AppHeader />
            </header>
            <main className={`${styles.main} pl-5 pr-5`}>
              <h2 className="text text_type_main-large mb-5">
                Соберите бургер
              </h2>
              <section className={styles.burgerBlock}>
                <BurgerIngredients />
                <BurgerConstructor />
              </section>
            </main>
          </>
        )}
        {isError && (
          <p
            data
            className={`${styles.error} ${styles.glitch} text text_type_main-medium`}
          >
            <span aria-hidden="true">
              Произошла ошибка загрузки данных. Пожалуйста, перезагрузите
              страницу.
            </span>
            Произошла ошибка загрузки данных. Пожалуйста, перезагрузите
            страницу.
            <span aria-hidden="true">
              Произошла ошибка загрузки данных. Пожалуйста, перезагрузите
              страницу.
            </span>
          </p>
        )}
      </div>
  );
};
