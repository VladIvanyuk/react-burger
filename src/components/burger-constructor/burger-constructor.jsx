import styles from "./burger-constructor.module.css";
import { useEffect, useState, useCallback } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "../../services/actions/orderDetails";
import { Modal } from "../modal/modal";
import { OrderDetails } from "../order-details/order-details";
import { useDrop } from "react-dnd";
import { ConstructorIngredient } from "../constructor-ingredient/constructor-ingredient";
import update from 'immutability-helper';
import { SORT_INGREDIENT, addBun, addIngridient } from "../../services/actions/burgerConstructor";
import { v4 as uuidv4 } from 'uuid';

export const BurgerConstructor = () => {
  const [isModal, setIsModal] = useState(false);
  const [orderSum, setOrderSum] = useState(0);
  const { burgerIngredients } = useSelector((store) => store);
  const dispatch = useDispatch();
  const orderNumber = useSelector((store) => store.orderDetails.details.order.number.toString());
  const constructorList = useSelector((store) => store.burgerConstructor);
  // разбиваем ингредиенты на булки и остальное
  const ingredientsWithoutBuns = constructorList.ingredients;
  // отдельно сохраняем булки
  const bun = constructorList.buns;

  const indgredientsIdList = constructorList.ingredients.map((el) => el._id);
  const [, dropTarget] = useDrop({
    accept: ["main", "sauce", "bun"],
    drop(item) {
      // проверка на добавление в конструктор или его сортировку
      if (item.action === 'add') {
          // проверка на тип ингредиента
          if (item.type !== "bun") {
            item.setIngredientCounter((prev) => prev + 1);
            const ingredient = burgerIngredients.data.find(
              (el) => el._id === item.id
            );
            dispatch(addIngridient(ingredient));
          } else {
            item.setIngredientCounter((prev) => prev + 1);
            const bun = burgerIngredients.data.find((el) => el._id === item.id);
            dispatch(addBun(bun));
          }
      }
    },
  });

  const onShowModalHandler = useCallback((value) => {
    setIsModal(value);
  }, []);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const sorted = update(constructorList.ingredients, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, constructorList.ingredients[dragIndex]],
      ],
    })

    dispatch({
      type: SORT_INGREDIENT,
      payload: sorted
    })
  }, [constructorList, dispatch])

  const sendData = () => {
    dispatch(getOrderDetails({ ingredients: indgredientsIdList }));
    setIsModal(true);
  };

  useEffect(() => {
    // считаем общую стоимость ингридиентов с двумя булками
    let sum = constructorList.ingredients.reduce((acc, cur) => acc + cur.price, 0) + (bun.price * 2);
    setOrderSum(sum)
  }, [constructorList, bun]);

  const ingredientsList = ingredientsWithoutBuns.map((el, index) => (
    <ConstructorIngredient
      key={uuidv4()}
      type={el.type}
      name={el.name}
      price={el.price}
      image={el.image}
      delete-id={el._delete_id}
      index={index}
      moveCard={moveCard}
      delete_id={el._delete_id}
    />
  ));

  return (
    <section
      ref={dropTarget}
      className={`${styles.constructorBlock} pr-1 pl-2`}
    >
      {isModal && (
        <Modal onShowModal={onShowModalHandler}>
          <OrderDetails orderNumber={orderNumber} />
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
          {orderSum}
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
