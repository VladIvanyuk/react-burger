/* eslint-disable react-hooks/exhaustive-deps */
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";
import { Link, useLocation } from "react-router-dom";
import { RootState, TFeedOrderData, TIngredient } from "../../../services/types/types";
import { useSelector as selectorHook } from "../../../services/hooks/hooks";
import { TypedUseSelectorHook } from "react-redux";
import { useEffect, useState } from "react";
import { dateFormatter } from "../../../utils/date-formatter";

export const FeedOrder: React.FC<TFeedOrderData> = ({ orderData }) => {
  const location = useLocation();
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const store = useSelector((store) => store);
  const ingredients = store.burgerIngredients.data;
  const ingredientsId = orderData.ingredients;
  let [orderPrice, setOrderPrice] = useState(0);
  const allIgredientsImgList: (string | undefined)[] = [];
  const allOrderIngredients: TIngredient[] = [];
  // отбираем ингридиенты и аватарки
  ingredientsId.forEach((el) => {
    const ingredient = ingredients.find(({_id}) => _id === el);
    if (ingredient) allOrderIngredients.push(ingredient);
    allIgredientsImgList.push(ingredient?.image_mobile);
  })
  // если ингридиентов больше 6, откусываем от основного массива для вывода
  const imgElemsForRender =
    allIgredientsImgList.length > 6 ? [...allIgredientsImgList].splice(0, 6) : allIgredientsImgList;
  const imgListDiff = allIgredientsImgList.length - 6;

  const formattedDateStr = dateFormatter(orderData.createdAt);
  // считаем общую стоимость всех ингредиентов заказа
  useEffect(() => {
    const price = allOrderIngredients.reduce((acc: number, cur: TIngredient) => {
      if(cur) {
        return acc + cur?.price
      } else {
        return acc;
      }
    }, 0)
    setOrderPrice(price);
  }, [])
  
  return (
    <div className="mb-4">
      <Link to={`${orderData.number}`} state= {{ background: location }} className={`${styles.order} p-6`}>
        <div className={`${styles.orderHeader} mb-6`}>
          <p className="text text_type_digits-default">#{orderData.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            {formattedDateStr}
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text text_type_main-medium">
            {orderData.name}
          </h3>
        </div>
        <div className={styles.orderFooter}>
          <div>
            {imgElemsForRender.map((img, index) => {
              // если ингредиентов больше 6, то рисуем картинку ингредиента с разницей
              return (
                <div
                  key={index}
                  className={styles.orderImageWrapper}
                  style={{
                    left: 40 * index + "px",
                    zIndex: imgElemsForRender.length * 10 - index * 10,
                    backgroundColor:
                      index === 5 && imgListDiff > 0
                        ? "rgba(0, 120, 201, 0.7)"
                        : "none",
                  }}
                >
                  {index === 5 && imgListDiff > 0 ? (
                    <>
                      <span className={styles.imgDiffCounter}>
                        <span className="text text_type_main-default">
                          +{imgListDiff}
                        </span>
                      </span>
                      <img
                        className={styles.orderImage}
                        src={img}
                        alt="Картинка продукта"
                      />
                    </>
                  ) : (
                    <img
                      className={styles.orderImage}
                      src={img}
                      alt="Картинка продукта"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.orderPrice}>
            <span className="text text_type_digits-default mr-2">{orderPrice}</span>
            <CurrencyIcon type={"primary"} />
          </div>
        </div>
      </Link>
    </div>
  );
};
