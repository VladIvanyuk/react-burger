import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { TFeedOrder } from "../../services/types/types";
import { getOrder } from "../../utils/burger-api";
import { dateFormatter } from "../../utils/date-formatter";
import { useSelector } from "../../services/hooks/hooks";

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
  const params: any = useParams();
  const store = useSelector((store) => store);
  const allOrders = useMemo(() => {
    const publicData = store.publicOrdersFeed.data.orders;
    const profileData = store.profileOrdersFeed.data.orders;
    const allData = publicData.concat(profileData);
    return allData;
  }, [store.profileOrdersFeed.data.orders, store.publicOrdersFeed.data.orders])
  const ingredients = store.burgerIngredients.data;
  const orderForModal: TFeedOrder | undefined = useMemo(() => allOrders.find((el) => el.number === +params.id), [allOrders, params.id]);
  const formattedDateStr = dateFormatter(order.createdAt);
  const filterredIngredients = Array.from(new Set(order.ingredients));
  let priceCounter = 0;
  // если нужного заказа нету в редьюсерах, делаем запрос за ним
  useEffect(() => {
    if (orderForModal) {
      if (Object.keys(orderForModal).length > 0) {
        setOrder(orderForModal);
      }
    } else {
      getOrder(params.id, {}).then((res) => setOrder(res.orders[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrderPrice(priceCounter);
  }, [order, priceCounter]);

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
        {filterredIngredients.map((el, index) => {
          const ingredientsCounter = order.ingredients.filter(
            (id) => el === id
          ).length;
          const ingredient = ingredients.find(
            (ingredient) => ingredient._id === el
          );

          if (ingredient) {
            priceCounter =
              priceCounter + ingredient.price * ingredientsCounter;
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
                    {ingredientsCounter} x {ingredient.price}
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
          {formattedDateStr}
        </p>
        <div className={`${styles.orderPrice}`}>
          <p className="text text_type_digits-default mr-2">{orderPrice}</p>
          <CurrencyIcon type={"primary"} />
        </div>
      </div>
    </div>
  );
};
