import { AppHeader } from "../app-header/app-header";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { OrderDetails } from "../order-details/order-details";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";
import styles from "./app.module.css";
import { useEffect, useState, useMemo, useCallback } from "react";
import { AppContext } from "../../services/appContext";
import { useSelector, useDispatch } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/burgerIngredients";

export const App = (props) => {

  const { isLoaded, isError } = useSelector((store) => store.burgerIngredients);
  const [isModal, setIsModal] = useState(false);
  const [ingredientForModal, setIngredientForModal] = useState();
  const [modalType, setModalType] = useState("");
  const orderNumber = useSelector((store) => store.orderDetails.order.number);
  const dispatch = useDispatch();

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
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const appContextValues = useMemo(() => {
    return { onShowModalHandler, getIngredientHandler, getModalTypeHandler};
  }, [ onShowModalHandler, getIngredientHandler, getModalTypeHandler])
  return (
    <AppContext.Provider value={appContextValues}>
      <div className={styles.app}>
        {isModal && (
          <Modal onShowModal={onShowModalHandler}>
            {findModalType(modalType)}
          </Modal>
        )}
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
    </AppContext.Provider>
  );
};
