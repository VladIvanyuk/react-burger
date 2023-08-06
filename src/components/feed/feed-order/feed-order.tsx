import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";
import { Link, useLocation } from "react-router-dom";
import { RootState, TFeedOrderData } from "../../../services/types/types";
import { useSelector as selectorHook } from "../../../services/hooks/hooks";
import { TypedUseSelectorHook } from "react-redux";

export const FeedOrder: React.FC<TFeedOrderData> = ({ orderData }) => {
  const location = useLocation();
  const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
  const store = useSelector((store) => store);
  const ingredients = store.burgerIngredients.data;
  const ingredientsId = orderData.ingredients;
  const allIgredientsImgList: (string | undefined)[] = [];
  ingredientsId.forEach((el) => {
    const ingredientImage = ingredients.find(({_id}) => _id === el)?.image_mobile
    allIgredientsImgList.push(ingredientImage);
  })
  console.log(allIgredientsImgList)
  // если ингридиентов больше 6, откусываем от основного массива для вывода
  const imgElemsForRender =
    allIgredientsImgList.length > 6 ? [...allIgredientsImgList].splice(0, 6) : allIgredientsImgList;
  const imgListDiff = allIgredientsImgList.length - 6;

  return (
    <div>
      <Link to={`1312`} state= {{ background: location }} className={`${styles.order} p-6`} onClick={(e) => console.log(e)}>
        <div className={`${styles.orderHeader} mb-6`}>
          <p className="text text_type_digits-default">#034535</p>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20
          </p>
        </div>
        <div className="mb-6">
          <h3 className="text text_type_main-medium">
            Death Star Starship Main бургер
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
            <span className="text text_type_digits-default mr-2">123</span>
            <CurrencyIcon type={"primary"} />
          </div>
        </div>
      </Link>
    </div>
  );
};
