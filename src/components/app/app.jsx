import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { OrderDetails } from "../order-details/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import styles from "./app.module.css";
// import { data } from "../../utils/data";fwe
import { useEffect, useState } from "react";
import { getData } from "../../utils/burger-api";

export const App = (props) => {
  const DATA_URL = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [ingredientForModal, setIngredientForModal] = useState();
  const [modalType, setModalType] = useState('');
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLodaing] = useState(false);

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
        alert("Нет таких значений");
    }
  }

  // получаем список ингридиентов
  useEffect(() => {
    getData(DATA_URL)
      .then((data) => {
        setData(data.data);
        setIsLodaing(true);
      })
      .catch(() => {
        setIsError(false);
        setIsLodaing(false);
      });
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
      {isLoading &&
        <>
          <header className="pt-4 pb-4 mb-10">
            <AppHeader />
          </header>
          <main className={`${styles.main} pl-5 pr-5`}>
            <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
            <section className={styles.burgerBlock}>
              <BurgerIngredients data={data} onShowModal={onShowModalHandler} getIngredient={getIngredientHandler} getModalType={getModalTypeHandler} />
              <BurgerConstructor data={data} onShowModal={onShowModalHandler} getModalType={getModalTypeHandler} />
            </section>
          </main>
        </>
      }
      {!isError &&
        <p data className={`${styles.error} ${styles.glitch} text text_type_main-medium`}>
          <span aria-hidden="true">Произошла ошибка загрузки данных. Пожалуйста, перезагрузите страницу.</span>
          Произошла ошибка загрузки данных. Пожалуйста, перезагрузите страницу.
          <span aria-hidden="true">Произошла ошибка загрузки данных. Пожалуйста, перезагрузите страницу.</span>
        </p>}
    </div>
  );
};
