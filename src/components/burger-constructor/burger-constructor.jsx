import styles from "./burger-constructor.module.css";
import { useEffect, useReducer, useState, useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../services/actions/orderDetails";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDrop } from "react-dnd";

const initialOrderSum = { sum: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "calculate":
      return { sum: action.sum };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

export const BurgerConstructor = () => {
  const [isModal, setIsModal] = useState(false);
  const { burgerIngredients } = useSelector((store) => store);
  const [, dropTarget] = useDrop({
    accept: ['main', 'sauce', 'bun'],
    drop(item) {
      if(item.type !== 'bun') {
        dispatch({
          type: 'ADD_INGREDIENT',
          payload: burgerIngredients.data.find((el) => el._id === item.id)
        })
      } else {
        dispatch({
          type: 'ADD_BUN',
          payload: burgerIngredients.data.find((el) => el._id === item.id)
        })
      }
    }

  })

  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.orderDetails.order.number);
  const constructorList = useSelector((store) => store.burgerConstructor);
  const [orderSum, orderSumDispatcher] = useReducer(reducer, initialOrderSum);

  // разбиваем ингредиенты на булки и остальное
  const ingredientsWithoutBuns = constructorList.filter(
    (el) => el.type !== "bun"
  );
  // отдельно сохраняем булки
  const bun = constructorList.find((el) => el.type === "bun");
  const indgredientsIdList = constructorList.map((el) => el._id);

  const onShowModalHandler = useCallback((value) => {
    setIsModal(value);
  }, []);

  const sendData = () => {
    dispatch(getOrderDetails({ ingredients: indgredientsIdList }));
    setIsModal(true)
  };

  useEffect(() => {
    // считаем общую стоимость ингридиентов с двумя булками
    let result =
      constructorList.reduce((acc, cur) => acc + cur.price, 0) + bun.price;
    orderSumDispatcher({ type: "calculate", sum: result });
  }, [constructorList, bun]);

  const ingredientsList = ingredientsWithoutBuns.map((el) => (
    <div key={el._id} className={styles.element}>
      <DragIcon />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
      />
    </div>
  ));

  return (
    <section ref={dropTarget} className={`${styles.constructorBlock} pr-1 pl-2`}>
      {isModal && (
        <Modal onShowModal={onShowModalHandler}>
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      )}
      <div className={`${styles.constructor} mb-10`}>
        <div className="mr-4">
          <ConstructorElement
            className="mb-4"
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${styles.scrollBlock} mb-4 pt-4 pr-2`}>
          {ingredientsList}
        </div>
        <div className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={styles.priceBlock}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          {orderSum.sum}
          <CurrencyIcon />
        </p>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={sendData}
        >
          Нажми на меня
        </Button>
      </div>
    </section>
  );
};
