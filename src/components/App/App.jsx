import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import styles from "./app.module.css";
import { data } from "../../utils/data";

export const App = (props) => {
  return (
    <div className={styles.app}>
      <header className="pt-4 pb-4 mb-10">
        <AppHeader />
      </header>
      <main className={`${styles.main} pl-5 pr-5`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <section className={styles.burgerBlock}>
          <BurgerIngredients data={data} />
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
};
