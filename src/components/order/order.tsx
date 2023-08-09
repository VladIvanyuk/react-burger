import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useSelector as selectorHook } from "react-redux";
import { RootState, TFeedOrder } from "../../services/types/types";
import { getOrder } from "../../utils/burger-api";

export const Order = () => {
  const [order, setOrder] = useState<TFeedOrder>({
    createdAt: "",
    ingredients: [],
    name: "",
    number: 0,
    status: "",
    updatedAt: "",
    _id: "",
  });
  const [orderPrice, setOrderPrice] = useState(0);
  const params = useParams();
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const store = useSelector((store) => store);
  const publicOrders = store.publicOrdersFeed.data.orders;
  const profileOrders = store.profileOrdersFeed.data.orders;
  const allOrders = publicOrders.concat(profileOrders);
  const ingredients = store.burgerIngredients.data;
  const orderForModal: TFeedOrder | undefined = allOrders.find(
    // @ts-ignore
    (el) => el.number === +params.id
  );
  let counter = 0;
  // если нужного заказа нету в редьюсерах, делаем запрос за ним
  useEffect(() => {
    if (orderForModal) {
      if (Object.keys(orderForModal).length > 0) {
        setOrder(orderForModal);
      }
    } else {
      // @ts-ignore
      getOrder(params.id, {}).then((res) => setOrder(res.orders[0]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrderPrice(counter);
  }, [counter, allOrders])

  return (
    <div className={`${styles.order} container`}>
      <p
        className={`${styles.orderNumber} text text_type_digits-default mb-10`}
      >
        {`#${order.number}`}
      </p>
      <h4 className="text text_type_main-medium mb-3">{order.name}</h4>
      <p className={`${styles.orderStatus} text text_type_main-default mb-15`}>
        {order.status === "done" ? "Готов" : "Готовится"}
      </p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.ingredientsList} mb-10`}>
        {order.ingredients.map((el, index) => {
          const ingredient = ingredients.find(
            (ingredient) => ingredient._id === el
          );

          if (ingredient) {
            counter += ingredient?.price;
          }

          return (
            ingredient && (
              <li key={index} className={`${styles.ingredient} mb-4`}>
                <div className={`${styles.ingredientInfo}`}>
                  <div className={`${styles.orderImgWrapper} mr-4`}>
                    <img
                      src={ingredient.image_mobile}
                      alt={ingredient.name}
                      className={styles.orderImg}
                    />
                  </div>
                  <h5 className={`text text_type_main-default`}>
                    {ingredient.name}
                  </h5>
                </div>
                <div className={`${styles.ingredientsCount}`}>
                  <p className="text text_type_digits-default mr-2">
                    1 x {ingredient.price}
                  </p>
                  <CurrencyIcon type={"primary"} />
                </div>
              </li>
            )
          );
        })}
      </ul>
      <div className={`${styles.orderFooterInfo} mb-10`}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50
        </p>
        <div className={`${styles.orderPrice}`}>
          <p className="text text_type_digits-default mr-2">{orderPrice}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
};
