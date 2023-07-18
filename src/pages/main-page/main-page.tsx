import { AppHeader } from "../../components/app-header/app-header";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import styles from './main-page.module.css';
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const MainPage: React.FC = (): JSX.Element => {

  const { isLoaded, isError } = useSelector((store: any) => store.burgerIngredients);


  return (
      <>
        {isLoaded && (
          <>
            <AppHeader />
            <main className={`${styles.main} pl-5 pr-5`}>
              <h2 className="text text_type_main-large mb-5">
                Соберите бургер
              </h2>
              <section className={styles.burgerBlock}>
                <DndProvider backend={HTML5Backend}>
                  <BurgerIngredients />
                  <BurgerConstructor />
                </DndProvider>
              </section>
            </main>
          </>
        )}
        {isError && (
          <p
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
      </>
  );
};
