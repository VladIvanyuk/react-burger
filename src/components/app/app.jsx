import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { OrderDetails } from "../order-details/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import styles from "./app.module.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import { getData } from "../../utils/burger-api";
import { AppContext } from "../../services/appContext";

export const App = (props) => {

  const [data, setData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [ingredientForModal, setIngredientForModal] = useState();
  const [modalType, setModalType] = useState("");
  const [isError, setIsError] = useState(true);
  const [isLoading, setIsLodaing] = useState(false);
  const [constructorList, setConstructorList] = useState([]);
  const [orderNumber, setOrderNumber] = useState(null);

  const onShowModalHandler = useCallback((value) => {
    setIsModal(value);
  }, []);

  const getIngredientHandler = useCallback((ingredient) => {
    setIngredientForModal(ingredient);
  }, []);

  const getModalTypeHandler = useCallback((type) => {
    setModalType(type);
  }, []);

  const findModalType = (type) => {
    switch (type) {
      case "order":
        return <OrderDetails orderNumber={orderNumber} />;
      case "ingredient":
        return <IngredientDetails ingredient={ingredientForModal} />;
      default:
        alert("Нет таких значений");
    }
  };

  // получаем список ингредиентов
  useEffect(() => {
    getData()
      .then((data) => {
        setData(data.data);
        setIsLodaing(true);
        // как будто мы уже добавили ингридиенты в конструктор
        setConstructorList([data.data[0], data.data[2], data.data[4], data.data[5], data.data[8], data.data[10], data.data[11], data.data[12], data.data[13]])
      })
      .catch(() => {
        setIsError(false);
        setIsLodaing(false);
      });
  }, []);

  const appContextValues = useMemo(() => {
    return {data, constructorList, onShowModalHandler, getIngredientHandler, getModalTypeHandler, setOrderNumber};
  }, [data, constructorList, onShowModalHandler, getIngredientHandler, getModalTypeHandler, setOrderNumber])
  return (
    <AppContext.Provider value={appContextValues}>
      <div className={styles.app}>
        {isModal && (
          <Modal onShowModal={onShowModalHandler}>
            {findModalType(modalType)}
          </Modal>
        )}
        {isLoading && (
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
        {!isError && (
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
    </AppContext.Provider>
  );
};
