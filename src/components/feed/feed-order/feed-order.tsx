import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./feed-order.module.css";

export const FeedOrder: React.FC = (props) => {
  const imgMockList = [
    "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
    "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
  ];
  // если ингридиентов больше 6, откусываем от основного массива для вывода
  const imgElemsForRender =
    imgMockList.length > 6 ? [...imgMockList].splice(0, 6) : imgMockList;
  const imgListDiff = imgMockList.length - 6;

  return (
    <div className={`${styles.order} p-6`}>
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
    </div>
  );
};
