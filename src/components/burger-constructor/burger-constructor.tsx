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
import update from "immutability-helper";
import {
  SORT_INGREDIENT,
  addBun,
  addIngridient,
} from "../../services/actions/burgerConstructor";
import { useNavigate, useLocation } from "react-router-dom";
import { TDragObj, TIngredient } from "../../types/types";


export const BurgerConstructor = () => {
  const [isModal, setIsModal] = useState(false);
  const [orderSum, setOrderSum] = useState(0);
  const [isShowBorders, setIsShowBorders] = useState({
    buns: true,
    mains: true
  });
  const store = useSelector((store: any ) => store);
  const { user } = store.user;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const burgerIngredients = store.burgerIngredients;
  const orderNumber = store.orderDetails.details.order.number.toString();
  const constructorList = store.burgerConstructor;
  const ingredientsWithoutBuns = constructorList.ingredients;
  const bun = constructorList.buns;
  const indgredientsIdList = constructorList.ingredients.map((el: TIngredient) => el._id);
  const isEmptyBuns = Object.entries(bun).length === 0;
  const isEmptyIngredients = Object.entries(ingredientsWithoutBuns).length === 0;
  const bordersBun = isShowBorders.buns ? styles.bordersBun : '';
  const bordersMain = isShowBorders.mains ? styles.bordersMain : '';

  const [, dropTarget] = useDrop<TDragObj>({
    accept: ["main", "sauce", "bun"],
    drop(item) {
      // проверка на добавление в конструктор или его сортировку
      if (item.action === "add") {
        // проверка на тип ингредиента
        if (item.type !== "bun") {
          item.setIngredientCounter((prev: number) => prev + 1);
          const ingredient = burgerIngredients.data.find(
            (el: TIngredient) => el._id === item.id
          );
          dispatch(addIngridient(ingredient));
          setIsShowBorders(() => {
            return {
              ...isShowBorders,
              mains: false
            }
          });
        } else {
          item.setIngredientCounter((prev: number) => prev + 1);
          const bun = burgerIngredients.data.find((el: TIngredient) => el._id === item.id);
          dispatch(addBun(bun));
          setIsShowBorders(() => {
            return {
              ...isShowBorders,
              buns: false
            }
          });
        }
      }
    },
  });

  const onShowModalHandler = useCallback((value: boolean) => {
    setIsModal(value);
  }, []);

  const isActiveButton = !isEmptyBuns && !isEmptyIngredients ? false : true;

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const sorted = update(constructorList.ingredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, constructorList.ingredients[dragIndex]],
        ],
      });

      dispatch({
        type: SORT_INGREDIENT,
        payload: sorted,
      });
    },
    [constructorList, dispatch]
  );

  const sendData = () => {
    if(!user) {
      navigate('/login', {
        state: location
      })
    }
    dispatch(getOrderDetails({ ingredients: indgredientsIdList }));
    setIsModal(true);
  };
  
  useEffect(() => {
    if(!isEmptyBuns && !isEmptyIngredients) {
      setIsShowBorders({
        buns: false,
        mains: false
      })
    }
  }, [isEmptyBuns, isEmptyIngredients])

  useEffect(() => {
    // считаем общую стоимость ингридиентов с двумя булками
    let sum =
      constructorList.ingredients.reduce((acc: TIngredient, cur: TIngredient) => acc.price + cur.price, 0) +
      (bun.price ? bun.price * 2 : 0);
    setOrderSum(sum);
  }, [constructorList, bun]);

  const ingredientsList = ingredientsWithoutBuns.map((el: TIngredient, index: number) => {
    return (
      <ConstructorIngredient
        key={el.uniqueId}
        type={el.type}
        name={el.name}
        price={el.price}
        image={el.image}
        uniqueId={el.uniqueId}
        index={index}
        moveCard={moveCard}
      />
    );
  });

  return (
    <section
      ref={dropTarget}
      className={`${styles.constructorBlock} pr-1 pl-2`}
    >
      {isModal && (
        <Modal onShowModal={onShowModalHandler} modalHeaderText={""}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
      <div className={`${styles.constructor} mb-10`}>
        <div className={`${styles.elementWrapper} ${bordersBun} ${styles.bordersTopBuns} mr-4 mb-4`}>
          {!isEmptyBuns && (
            <ConstructorElement
              extraClass="mb-4"
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
          {isEmptyBuns && (
            <p className={`${styles.emptyBuns} text text_type_digits-default`}>Добавьте булочку</p>
          )}
        </div>
        <div className={`${styles.scrollBlock} ${bordersMain} mb-4 pt-4 pr-2`}>
          {!isEmptyBuns || !isEmptyIngredients ? (
            ingredientsList
          ) : (
            <div className={`${styles.constructorPlaceholder}`}>
                <p className="text text_type_digits-medium">
                Добавьте игредиенты
              </p>
            </div>
          )}
        </div>
        <div className={`${styles.elementWrapper} ${bordersBun} ${styles.bordersBottomBuns} mr-4`}>
          {!isEmptyBuns && (
            <ConstructorElement
              extraClass="mb-4"
              type="bottom"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
          {isEmptyBuns && (
            <p className={`${styles.emptyBuns} text text_type_digits-default`}>Добавьте булочку</p>
          )}
        </div>
      </div>
      <div className={styles.priceBlock}>
        <p className={`${styles.price} text text_type_digits-medium`}>
          {orderSum ? orderSum : 0}
          <CurrencyIcon type={"secondary"} />
        </p>
        <Button
          disabled={isActiveButton}
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