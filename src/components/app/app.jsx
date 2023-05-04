import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { OrderDetails } from "../order-details/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import styles from "./app.module.css";
// import { data } from "../../utils/data";fwe
import { useEffect, useState } from "react";

export const App = (props) => {
  const DATA_URL = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [ingredientForModal, setIngredientForModal] = useState();
  const [modalType, setModalType] = useState('');

  const onShowModalHandler = (value) => {
    setIsModal(value);
  };

  const getIngredientHandler = (ingredient) => {
    setIngredientForModal(ingredient);
  };

  const getModalTypeHandler = (type) => {
    setModalType(type);
  };

  const findModalType = (type) => {
    switch (type) {
      case 'order':
        return <OrderDetails />;
      case 'ingredient':
        return <IngredientDetails ingredient={ingredientForModal} />;
      default:
        alert( "Нет таких значений" );
    }
  }

  // получаем список ингридиентов
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(DATA_URL);
        const { data } = await response.json();
        console.log(data);
        setData(data);
      } catch {
        console.log("Ошибка загрузки данных");
      }
    };
    getData();
  }, []);

  return (
    <div className={styles.app}>
      {isModal && (
        <Modal onShowModal={onShowModalHandler}>
          {/* <IngredientDetails ingredient={ingredientForModal} /> */}
          {/* <OrderDetails /> */}
          {findModalType(modalType)}
        </Modal>
      )}
      <header className="pt-4 pb-4 mb-10">
        <AppHeader />
      </header>
      <main className={`${styles.main} pl-5 pr-5`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <section className={styles.burgerBlock}>
          <BurgerIngredients data={data} onShowModal={onShowModalHandler} getIngredient={getIngredientHandler} getModalType={getModalTypeHandler}/>
          <BurgerConstructor data={data} onShowModal={onShowModalHandler} getModalType={getModalTypeHandler} />
        </section>
      </main>
    </div>
  );
};
